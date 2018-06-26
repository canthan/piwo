import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import StorageSummaryHeaderComponent from './SummaryHeader/SummaryHeader';
import { StorageSummaryLineComponent } from './SummaryLine/SummaryLine';
import { Stash, GrouppedStash } from '../storage.types';
import { OverallAppState } from '../../../reducers/initialState';
import SummaryService from './summaryService';

interface Props {
  stashes: Stash[],
}

interface State {
  GrouppedStashes: GrouppedStash[],
}

export class StorageSummaryComponent extends React.Component<Props, State> {
  state = {
    GrouppedStashes: [],
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.stashes && JSON.stringify(nextProps.stashes) !== JSON.stringify(this.props.stashes)) {
      this.setState({ GrouppedStashes: SummaryService.groupStashes(nextProps.stashes) });
    }
    return true;
  }

  render() {
    return (
      <React.Fragment>
        <StorageSummaryHeaderComponent />
        {this.state.GrouppedStashes.map(stash => {
          return <StorageSummaryLineComponent stash={stash} key={stash.stash_name}/>
        })}
        {/* <StorageSummaryLineComponent /> */}
      </React.Fragment>
    );
  }

}


const mapStateToProps = (state: OverallAppState) => ({
  stashes: state.stashes.stashes,
});

export default connect(mapStateToProps)(StorageSummaryComponent);
