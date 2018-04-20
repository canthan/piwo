import { Batch, EmptyBatch } from './storage.types';

export class CommonStorageService {

  public static formatDateForDisplay(batchesArray: Batch[]): Batch[] {
    batchesArray.forEach((batch, index) => {
      batchesArray[index].bottled_on = batch.bottled_on.slice(0, batch.bottled_on.indexOf('T'));
    });
    return batchesArray;
  }

  public static calculateQuantities(batchesArray: Batch[]) {
    batchesArray.forEach((batch) => {
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

  private static decodeBottleVolume(bottleVolumeString: string) {
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

  public flattenItemsForRequest(stashes) {
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
}

export default CommonStorageService;
