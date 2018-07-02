import { StashSummary } from './../components/storage/storage.types';
import {
  GET_SUMMARY_FROM_STASHES,
  CHANGE_SUMMARY_BOTTLES_AMOUNT
} from './../constants/summary.action.types';

import { SummaryService } from './../components/storage/Summary/summaryService';
import { createConditionalSliceReducer } from './utils';
import { CommonStorageService } from '../components/storage/common.service';

export const initialSummaryState = {
  summary: {
    summary: []
  }
};

const changeBottlesAmount = (
  current_summary: StashSummary[],
  stash_name: string,
  amount: number,
  bottle_type: string
) => {
  console.log("anything")
  const changedSummary: StashSummary[] = [...current_summary];
  const changedStash: StashSummary = changedSummary.find(
    summary => summary.stash_name === stash_name
  );
  CommonStorageService.decodeBottleVolume(bottle_type) === 0.5
    ? (changedStash.bottles.half_liter += amount)
    : (changedStash.bottles.small += amount);
  return changedSummary;
};

const summaryReducerMapping = () => ({
  [GET_SUMMARY_FROM_STASHES]: (state, { summary }) => ({
    ...state,
    ...{ summary }
  }),
  [CHANGE_SUMMARY_BOTTLES_AMOUNT]: (state, payload) => ({
    ...state,
    ...{
      summary: changeBottlesAmount(
        state.summary,
        payload.stash_name,
        payload.amount,
        payload.bottle_type
      )
    }
  })
});

export const summaryReducer = createConditionalSliceReducer(
  'summary',
  summaryReducerMapping(),
  initialSummaryState
);
