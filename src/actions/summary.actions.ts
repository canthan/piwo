import { SummaryService } from './../components/storage/Summary/summaryService';
import { AnyAction } from 'redux';
import { Dispatch } from 'react-redux';
import Axios, { AxiosResponse, AxiosError } from 'axios';

import { AsyncAction } from './../types/app.types';

import { GET_SUMMARY_FROM_STASHES } from './../constants/summary.action.types';
import { Stash, StashSummary } from '../components/storage/storage.types';

export const getSummaryFromStashes = (stashes: Stash[]): AnyAction => {
  const summary: StashSummary[] = SummaryService.createSummary(stashes);
  return {
    payload: { summary },
    type: GET_SUMMARY_FROM_STASHES
  };
}; 
