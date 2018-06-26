import { Stash, StashSummary, GrouppedStash } from './../storage.types';
import { CommonStorageService } from '../common.service';

export class SummaryService {
  public static createSummary(stashes: Stash[]): StashSummary[] {
    const grouppedStashes: GrouppedStash[] = this.groupStashes(stashes);
    const stashSummary: StashSummary[] = this.composeSummary(grouppedStashes);

    return stashSummary;
  }

  private static composeSummary(
    grouppedStashes: GrouppedStash[],
    stashSummary: StashSummary[] = []
  ) {
    grouppedStashes.forEach(stash => {
      const summary: StashSummary = this.createSummaryForStash(stash);
      summary.bottles.small = this.getSmallBottles(stash);
      summary.litres = this.getLiters(stash);
      
      stashSummary.push(summary);
    });
    return stashSummary;
  }

  private static createSummaryForStash(grouppedStash: GrouppedStash): StashSummary {
    return new StashSummary(grouppedStash.stash_name, grouppedStash.items['b050']);
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
    const GrouppedStashes: GrouppedStash[] = [];
    stashes.forEach(stash => {
      GrouppedStashes.find(groupped => stash.stash_name === groupped.stash_name)
        ? this.addBottles(GrouppedStashes, stash)
        : this.createNewGroup(GrouppedStashes, stash);
    });
    return GrouppedStashes;
  }

  private static addBottles(GrouppedStashes: GrouppedStash[], stash: Stash) {
    const GrouppedStash = GrouppedStashes.find(
      groupped => groupped.stash_name === stash.stash_name
    );
    Object.keys(stash.items).forEach(item => {
      const quantity = Object.keys(GrouppedStash.items).find(
        grouppedItem => grouppedItem === item
      );
      quantity
        ? (GrouppedStash.items[quantity] += stash.items[quantity])
        : (GrouppedStash.items = stash.items);
    });
  }

  private static createNewGroup(
    GrouppedStashes: GrouppedStash[],
    stash: Stash
  ) {
    const { stash_name, items } = stash;
    GrouppedStashes.push({ stash_name, items, crates_total: 0 });
  }
}

export default SummaryService;
