import { Stash, StashSummary, GrouppedStash } from './../storage.types';
import { CommonStorageService } from '../common.service';

export class SummaryService {
  public static createSummary(stashes: Stash[]): StashSummary[] {
    let grouppedStashes = [];
    grouppedStashes = [...this.groupStashes(stashes)];
    const stashSummary: StashSummary[] = this.composeSummary(grouppedStashes);

    return stashSummary;
  }

  private static composeSummary(
    grouppedStashes: GrouppedStash[],
    stashSummary: StashSummary[] = []
  ) {
    grouppedStashes.forEach(grouppedStash => {
      const summary: StashSummary = this.createSummaryForStash(grouppedStash);
      summary.bottles.small = this.getSmallBottles(grouppedStash);
      summary.litres = this.getLiters(grouppedStash);

      stashSummary.push(summary);
    });
    return stashSummary;
  }

  private static createSummaryForStash(
    grouppedStash: GrouppedStash
  ): StashSummary {
    return new StashSummary(
      grouppedStash.stash_name,
      grouppedStash.items['b050']
    );
  }

  private static getLiters(grouppedStash: GrouppedStash): number {
    let litres = 0;
    for (let [key, value] of Object.entries(grouppedStash.items)) {
      litres += CommonStorageService.decodeBottleVolume(key) * value;
    }
    return litres;
  }

  private static getSmallBottles(grouppedStash: GrouppedStash): number {
    let bottles_small = 0;
    for (let [key, value] of Object.entries(grouppedStash.items)) {
      if (CommonStorageService.decodeBottleVolume(key) < 0.5) {
        bottles_small += value;
      }
    }
    return bottles_small;
  }

  private static groupStashes(stashes: Stash[]): GrouppedStash[] {
    const grouppedStashes: GrouppedStash[] = [];
    stashes.forEach(stash => {
      grouppedStashes.find(groupped => stash.stash_name === groupped.stash_name)
        ? this.addBottles(grouppedStashes, stash)
        : this.createNewGroup(grouppedStashes, stash);
    });
    return grouppedStashes;
  }

  private static addBottles(grouppedStashes: GrouppedStash[], stash: Stash) {
    const grouppedStash = grouppedStashes.find(groupped => groupped.stash_name === stash.stash_name);
    Object.keys(stash.items).forEach(item => {
      const quantity = Object.keys(grouppedStash.items).find(
        grouppedItem => grouppedItem === item
      );
      grouppedStash.items[quantity] += stash.items[quantity];
    });
  }

  private static createNewGroup(
    grouppedStashes: GrouppedStash[],
    stash: Stash
  ) {
    const { stash_name, items } = stash;
    grouppedStashes.push({ stash_name, items: {...items}, crates_total: 0 });
  }
}

export default SummaryService;
