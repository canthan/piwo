import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, dispatch } from 'react-redux';
import { AnyAction } from 'redux';

import ItemComponent from './StorageItem/StorageItem';
import EmptyItemComponent from './EmptyItem/EmptyItem';
import { StorageSummaryComponent } from './Summary/Summary';
import { CommonStorageService } from './common.service';

import { OverallAppState } from '../../reducers/initialState';
import { AsyncAction } from '../../types/app.types';

import { Batch, Stash } from './storage.types';

import './Storage.scss';

interface MappedProps {
  user_id: number;
  batches: Batch[];
  stashes: Stash[];
}

type Props = MappedProps;

export class StorageComponent extends React.Component<Props> {

  renderItem(batch, index) {
    const stashes = this.props.stashes.filter(stash => stash.batch_id === batch.batch_id);
    return (
      <ItemComponent
        batch={batch}
        key={index}
        stashes={stashes}
        user_id={this.props.user_id}
      />
    );
  }

  render() {
    return (
      <div>
        <StorageSummaryComponent />

        <div className="storage">
          <div className="container">
            <div className="row">
              {this.props.batches.map((batch: Batch, index: number) => {
                return this.renderItem(batch, index);
              })}
              <EmptyItemComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: OverallAppState) => ({
  batches: state.batches.batches,
  stashes: state.stashes.stashes,
});

export default connect(mapStateToProps)(StorageComponent);
