import { Stash, StashSummary, GrouppedStash } from './../storage.types';

export class SummaryService {
  public static createSummary(stashes: Stash[]): StashSummary[] {
    const grouppedStashes: GrouppedStash[] = this.groupStashes(stashes);
    console.log(grouppedStashes)
    const stashSummary: StashSummary[] = this.composeSummary(grouppedStashes);

    return stashSummary;
  }

  public static composeSummary(
    grouppedStashes: GrouppedStash[],
    stashSummary: StashSummary[] = []
  ) {
    grouppedStashes.forEach(stash => {
      const summary: StashSummary = new StashSummary(
        stash.stash_name,
        stash.items['b050']
      );
      stashSummary.push(summary);
    });
    return stashSummary;
  }

  public static groupStashes(stashes: Stash[]): GrouppedStash[] {
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
