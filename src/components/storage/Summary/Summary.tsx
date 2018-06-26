import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import StorageSummaryHeaderComponent from './SummaryHeader/SummaryHeader';
import { StorageSummaryLineComponent } from './SummaryLine/SummaryLine';
import { Stash, GrouppedStash, StashSummary } from '../storage.types';
import { OverallAppState } from '../../../reducers/initialState';
import SummaryService from './summaryService';

interface Props {
  summary: StashSummary[],
}

export class StorageSummaryComponent extends React.Component<Props> {

  render() {
    return (
      <React.Fragment>
        <StorageSummaryHeaderComponent />
        {this.props.summary.map(stashSummary => {
          return <StorageSummaryLineComponent summary={stashSummary} key={stashSummary.stash_name}/>
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: OverallAppState) => ({
  summary: state.summary.summary,
});

export default connect(mapStateToProps)(StorageSummaryComponent);
