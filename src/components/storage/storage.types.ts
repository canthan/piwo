export interface IBatch {
  batch_number: number;
  batch_name: string;
  bottled_on: string;
  quantity_litres: number;
  quantity_bottles: number;
  quantity_crates: number;
  stashes: IQuantity[];
}

export interface IOverallQuantity {
  quantity_bottles: number;
  quantity_crates: number;
  quantity_litres: number;
}

// export interface IQuantity {
//   batch_number: number;
//   stash_id?: number;
//   stash_name: string;
//   items?: IBottles;
//   key?: number;
// }

export class IQuantity {
  constructor(stash_name, batch_number, items = {}) {
    this.items = new IBottles();
    this.batch_number = batch_number;
    this.stash_name = stash_name;
  }
  batch_number: number;
  stash_id?: number;
  stash_name: string;
  items: IBottles;
  key?: number;
}

export interface IQuantityStorage {
  stashKey: number;
  stash: IQuantity;
  onQuantityChange: any;
  onQuantitySelection: any;
}

export class IBottles {
  constructor(b033 = 0, b040 = 0, b050 = 0) {
    this.b033 = b033;
    this.b040 = b040;
    this.b050 = b050;
  }
  [bottleSize: string]: number;
}
// export interface IBottles {
//   [bottleSize: string]: number;
//   b033?: number;
//   b040?: number;
//   b050?: number;
//   b066?: number;
// }

export interface IHeader {
  bottled_on: string;
  batch_number: number;
  batch_name: string;
}

export interface IButtons {
  increase: number[];
  decrease: number[];
  onButtonClick: object;
}

export interface IOptions {
  buttons: string[];
  functions: {
    [buttonFunction: string]: object;
  };
  // onSaveClick: object;
}

export default IBatch;
