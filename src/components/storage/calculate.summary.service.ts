import { Batch, Stash } from './storage.types';
import { StorageSummaryProps } from './summary/storage.summary.types';

const BOTTLES_IN_CRATE = 20;

export class CalculateSummaryService {
  public stashNames: string[];
  public summary: StorageSummaryProps[] = [];
  private cratesOverall: number[] = [11, 4];
  private cratesFull: number[];

  constructor(batches: Batch[]) {
    console.log('constructor hello', batches)
    this.stashNames = this.getStorageNames(batches);
    console.log(this.stashNames)
    this.cratesFull = this.getCratesNumber(batches, this.stashNames);
    console.log(this.cratesFull)
    this.stashNames.forEach((stash, index) => {
      console.log('CalculateSummaryService constructor', index, stash );
      this.summary[index] = {
        stashName: this.stashNames[index],
        litres_overall: 1,
        litres_in_05: 2,
        bottles_small: 3,
        bottles_05: 4,
        quantity_crates: {
          overall: this.cratesOverall[index],
          empty: this.cratesOverall[index] - this.cratesFull[index],
          full: this.cratesFull[index],
        }
      }
      console.log(this.summary)

    });

  }

  doStashesExist = (batch: Batch) => {
    return batch.stashes.length ?
      true :
      false;
  }

  isStashListed = (name: string, list: string[]) => {
    return list.includes(name) ?
      true :
      false;
  }

  getStorageNames(batches: Batch[]): string[] {
    const names: string[] = [];
    batches.forEach((batch) => {
      if (this.doStashesExist(batch)) {
        batch.stashes.forEach((stash) => {
          if (!this.isStashListed(stash.stash_name, names)) {
            names.push(stash.stash_name);
          }
        });
      }
    });
    return names;
  }

  getCratesNumber(batches: Batch[], stashNames: string[]): number[] {
    const cratesNumber: number[] = [];
    stashNames.forEach((stash, index) => {
      cratesNumber.push(0);
      batches.forEach((batch) => {
        batch.stashes.forEach((stash) => {
          if (this.specifiedStash(stashNames[index], stash)) {
            cratesNumber[index] += stash.items.b050 / BOTTLES_IN_CRATE;
          }
        })
      })
    })
    return this.roundNumberPipe(cratesNumber, 2);
  }

  specifiedStash = (stashName: string, stash: Stash) => {
    return stash.stash_name === stashName ?
      true :
      false;
  }

  roundNumberPipe(values: number[], digits: number): number[] {
    const result: number[] = [];
    values.forEach((value) => {
      result.push(Number(value.toFixed(digits)));
    })
    return result;
  }

}

export default CalculateSummaryService;
