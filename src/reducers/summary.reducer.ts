import {
  GET_SUMMARY_FROM_STASHES,
} from './../constants/summary.action.types';

import { SummaryService } from './../components/storage/Summary/summaryService';
import { createConditionalSliceReducer } from './utils';

export const initialSummaryState = {
  summary: {
    summary: []
  }
};

const summaryReducerMapping = () => ({
  [GET_SUMMARY_FROM_STASHES]: (state, { summary }) => ({
    ...state,
    ...{ summary }
  }),
});

export const summaryReducer = createConditionalSliceReducer(
  'summary',
  summaryReducerMapping(),
  initialSummaryState
); 
