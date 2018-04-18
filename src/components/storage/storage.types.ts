export interface StorageState {
  batches: Batch[];
}

export interface ItemState {
  stashes: Stash[];
  selected: any;
}

export class Batch {
  constructor(bottled_on = '', batch_id = 0, batch_name = '', litres = 0, bottles = 0, crates = 0) {
    this.batch_id = batch_id;
    this.batch_name = batch_name;
    this.bottled_on = bottled_on;
    this.quantity_litres = litres;
    this.quantity_bottles = bottles;
    this.quantity_crates = crates;
    this.stashes = [];
  }
  batch_id?: number;
  batch_name: string;
  bottled_on: string;
  quantity_litres: number;
  quantity_bottles: number;
  quantity_crates: number;
  stashes: Stash[];
}

export class EmptyBatch {
  constructor(bottled_on = '2018-04-03', batch_id = 1, batch_name = 'aaa') {
    this.batch_id = batch_id;
    this.batch_name = batch_name;
    this.bottled_on = bottled_on;
  }
  batch_id: number;
  batch_name: string;
  bottled_on: string;
}

export class Stash {
  constructor(stash_name, batch_id, items = {}) {
    this.items = new Bottles();
    this.batch_id = batch_id;
    this.stash_name = stash_name;
  }
  batch_id: number;
  stash_id?: number;
  stash_name: string;
  items: Bottles;
  key?: number;
}

export interface OverallQuantity {
  quantity_bottles: number;
  quantity_crates: number;
  quantity_litres: number;
}

export interface QuantityStorage {
  stashKey: number;
  stash: Stash;
  onQuantityChange: any;
  onQuantitySelection: any;
}

export class Bottles {
  constructor(b033 = 0, b040 = 0, b050 = 0) {
    this.b033 = b033;
    this.b040 = b040;
    this.b050 = b050;
  }
  [bottleSize: string]: number;
}

export interface Buttons {
  increase: number[];
  decrease: number[];
  onQuantityChangeButton: object;
}

export interface Options {
  buttons: string[];
  functions: {
    [buttonFunction: string]: object;
  };
}

export default Batch;
