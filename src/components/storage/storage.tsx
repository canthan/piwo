import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, dispatch } from 'react-redux';
import { AnyAction } from 'redux';

import { ItemComponent } from './item/storage.item';
import { EmptyItemComponent } from './empty_item/storage.item.empty';
import { StorageSummaryComponent } from './summary/storage.summary';
import { CommonStorageService } from './common.service';

import { getBatchesDataAsync, deleteBatchAsync, addBatchAsync, addStashAsync } from '../../actions/storage.actions';
import { OverallAppState } from '../../reducers/initialState';
import { AsyncAction } from '../../types/app.types';

import { Batch, StorageState, EmptyBatch, Stash } from './storage.types';

import './storage.scss';

interface MappedProps {
  user_id: number;
  batches: Batch[];
}

interface MappedActions {
  addBatchAsync(user_id: number, newBatch: EmptyBatch): AsyncAction;
  addStashAsync(user_id: number, batch_id: number, newStash: Stash): AsyncAction;
  deleteBatchAsync(user_id: number, batch_id: number): AsyncAction;
  getBatchesDataAsync(user_id: number): AsyncAction;
}

type Props = MappedActions & MappedProps;

export class StorageComponent extends React.Component<Props> {
  addBatch = (newBatch: EmptyBatch) => this.props.addBatchAsync(this.props.user_id, newBatch);
  addStash = (batch_id: number, newStash: Stash) => {
    console.log(this.props.user_id, batch_id, newStash)
    return this.props.addStashAsync(this.props.user_id, batch_id, newStash);
  }
  getBatchesData = (user_id: number): AsyncAction => this.props.getBatchesDataAsync(user_id);
  deleteBatch = (user_id: number, batch_id: number): AsyncAction =>
    this.props.deleteBatchAsync(user_id, batch_id);

  getSummary(storageData) { }

  renderStorageSummary() {
    return <StorageSummaryComponent />;
  }

  renderItem(item, index) {
    return (
      <ItemComponent
        item={item}
        key={index}
        addStash={this.addStash}
        deleteBatch={this.deleteBatch}
        user_id={this.props.user_id}
      />
    );
  }

  renderEmptyItem() {
    return (
      <EmptyItemComponent
        addBatch={this.addBatch}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderStorageSummary()}

        <div className="storage">
          <div className="container">
            <div className="row">
              {this.props.batches.map((item, index) => {
                return this.renderItem(item, index);
              })}
              {this.renderEmptyItem()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Input extends React.Component<{}, {}> { }

export class Label extends React.Component<{}, {}> { }

export class Text extends React.Component<{}, {}> { }

const mapStateToProps = (state: OverallAppState) => ({
  batches: state.storage.batches
});

export default connect(mapStateToProps, {
  getBatchesDataAsync,
  deleteBatchAsync,
  addBatchAsync,
  addStashAsync,
})(StorageComponent);
