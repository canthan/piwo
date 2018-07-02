import { Batch, EmptyBatch, Stash, GrouppedStash } from './storage.types';

export class CommonStorageService {

  public static formatDateForDisplay(batchesArray: Batch[]): Batch[] {
    batchesArray.forEach((batch, index) => {
      batchesArray[index].bottled_on = batch.bottled_on.slice(0, batch.bottled_on.indexOf('T'));
    });
    return batchesArray;
  }

  public static calculateQuantities(batches: Batch[]) {
    batches.forEach((batch) => {
      const { quantity_litres: litres, quantity_bottles: bottles, quantity_crates: crates } = this.iterateThroughBatch(batch);
      batch.quantity_litres = litres;
      batch.quantity_bottles = bottles;
      batch.quantity_crates = crates;
    });
  }

  private static iterateThroughBatch(batch: Batch) {
    let q_litres = 0, q_bottles = 0, q_crates = 0;
    batch.stashes.forEach((stash) => {
      Object.keys(stash.items).forEach((bottle) => {
        q_bottles += Number(stash.items[bottle]);
        q_litres += this.decodeBottleVolume(bottle) * Number(stash.items[bottle]);
        q_crates += bottle === 'b050' ? Number(stash.items[bottle]) / 20 : 0;
      });
    });
    return {
      quantity_litres: q_litres,
      quantity_bottles: q_bottles,
      quantity_crates: q_crates,
    };
  }

  public static getOverallQuantities(stashes: Stash[]) {
    let litres = 0, bottles = 0, bottles_small = 0, crates = 0;
    stashes.forEach((stash) => {
      Object.keys(stash.items).forEach((bottle) => {
        bottles += bottle === 'b050' ? Number(stash.items[bottle]) : 0;
        bottles_small += bottle !== 'b050' ? Number(stash.items[bottle]) : 0;
        litres += this.decodeBottleVolume(bottle) * Number(stash.items[bottle]);
        crates += bottle === 'b050' ? Number(stash.items[bottle]) / 20 : 0;
      });
    });
    return {
      litres: `${litres.toFixed(2)}`,
      crates: `${crates.toFixed(2)}`,
      bottles: bottles_small ? `${bottles} + ${bottles_small}` : `${bottles}`,
    };
  }

  public static decodeBottleVolume(bottleVolumeString: string) {
    return this.checkBottleStringType(bottleVolumeString) ?
      Number(bottleVolumeString.slice(1, 3)) / 10 :
      null;
  }

  private static checkBottleStringType(bottleVolumeString: string) {
    const stringType = /b\d{3}/;
    return stringType.exec(bottleVolumeString) ?
      true :
      false;
  }

  public static flattenItemsForRequest(stashes) {
    const flattened = [];
    const inputStashes = JSON.parse(JSON.stringify(stashes));
    inputStashes.forEach((stash) => {
      Object.keys(stash.items).forEach((key) => {
        stash[key] = stash.items[key];
      });
      delete stash.items;
      flattened.push(stash);
    });
    return { stashes: flattened };
  }

  public static addStashesToBatch(batches: Batch[], stash: Stash) {
    batches.forEach((batch) => {
      if (batch.batch_id === stash.batch_id) {
        batch.stashes.push(stash);
        return;
      }
    });
    return batches;
  }

  public static updateStashesinBatch(batches: Batch[], stashes: Stash[]) {
    batches.forEach((batch) => {
      if (batch.batch_id === stashes[0].batch_id) {
        batch.stashes = stashes
        return;
      }
    });
    return batches;
  }

  public static getStashesFromBatch(batches: Batch[], batch_id: number): Stash[] {
    return batches.find(batch => batch.batch_id === batch_id).stashes;
  }
}

export default CommonStorageService;
