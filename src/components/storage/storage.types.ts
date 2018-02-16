export interface I_Item {
  number: number;
  name: string;
  date: string;
  quantity_l: number;
  quantity_b: number;
  quantity_c: number;
  stashes: I_Quantity[];
}

export interface I_OverallQuantity {
  bottles: number;
  crates: number;
  litres: number;
}

export interface I_Quantity {
  name: string;
  items: I_Bottles;
  key: number;
}

export interface I_QuantityStorage {
  stashKey: number; 
  stash: I_Quantity; 
  onQuantityChange: any;
  onQuantitySelection: any;
}

export interface I_Bottles {
  b033?: number; 
  b040?: number;
  b050?: number;
  b066?: number;
}

export interface I_Header {
  date: string;
  number: number;
  style: string;
}

export interface I_Buttons {
  increase: number[];
  decrease: number[];
  onButtonClick: object;
}

export interface I_Options {
  buttons: string[];
}

export default I_Item;
