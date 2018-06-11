import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { IStorageSummary, IStorageSummaryProps } from './summary.types';
import StorageSummaryHeaderComponent from './SummaryHeader/SummaryHeader';
import { StorageSummaryLineComponent } from './SummaryLine/SummaryLine';
import { Stash, grouppedStash } from '../storage.types';
import { OverallAppState } from '../../../reducers/initialState';
import CommonStorageService from '../common.service';

interface Props {
  stashes: Stash[],
}

interface State {
  grouppedStashes: grouppedStash[],
}

export class StorageSummaryComponent extends React.Component<Props, State> {
  state = {
    grouppedStashes: [],
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.stashes) {
      this.setState({ grouppedStashes: CommonStorageService.groupStashes(nextProps.stashes) });
    }
  }

  render() {
    return (
      <React.Fragment>
        <StorageSummaryHeaderComponent />
        {this.state.grouppedStashes.map(stash => {
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
