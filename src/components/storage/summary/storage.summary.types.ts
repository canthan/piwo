export interface StorageSummary {
  stashName: string;
  quantity_crates: {
    overall: number,
    empty: number,
    full: number
  };
}

export interface StorageSummaryProps {
  stashName: string;
  litres_overall: number;
  litres_in_05: number;
  bottles_small: number;
  bottles_05: number;
  quantity_crates: {
    overall: number,
    empty: number,
    full: number
  };
}