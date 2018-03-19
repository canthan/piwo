import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ItemComponent } from './item/storage.item';
import { EmptyItemComponent } from './empty_item/storage.item.empty';
import { StorageSummaryComponent } from './summary/storage.summary';
import { CommonStorageService } from './common.service';
import { StorageHttpService } from './storage.http.service';
import { Batch } from './storage.types';

import './storage.scss';

interface Props {
  user_id: number;
}

interface State {
  batches: Batch[];
}

export class StorageComponent extends React.Component<Props, State> {
  public storageData;
  public commonService: CommonStorageService = new CommonStorageService();
  public httpService: StorageHttpService = new StorageHttpService();
  constructor(props) {
    super(props);

    this.state = {
      batches: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.httpService.getStorageData(newProps.user_id)
    .then((response) => {
      this.storageData = response.data.data;
      console.log(this.storageData);
      this.storageData.batches = this.commonService.formatDateForDisplay(this.storageData.batches);
      this.commonService.calculateQuantities(this.storageData.batches);
      this.setState({ batches: this.storageData.batches });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getSummary(storageData) {

  }

  renderStorageSummary() {
    return (
      <StorageSummaryComponent

      />
    );
  }

  renderItem(item, index) {
    return (
      <ItemComponent item={item} key={index} afterBatchWasDeleted={this.afterBatchWasDeleted} user_id={this.props.user_id} />
    );
  }

  renderEmptyItem() {
    return (
      <EmptyItemComponent
        afterBatchWasAdded={this.afterBatchWasAdded} user_id={this.props.user_id}/>
    );
  }

  afterBatchWasAdded = (newBatch) => {
    const newState = this.state;
    newState.batches.push(newBatch);
    this.setState(newState);
  }

  afterBatchWasDeleted = (deletedBatchId) => {
    const newState = JSON.parse(JSON.stringify(this.state));
    const deletedBatchIndex = this.getDeletedBatchIndex(newState.batches, deletedBatchId);
    newState.batches.splice(deletedBatchIndex, 1);
    this.setState(newState);
  }

  getDeletedBatchIndex = (batches, deletedBatchId) => {
    let deletedBatchIndex;
    batches.forEach((batch, index) => {
      if (batch.batch_id === deletedBatchId) { deletedBatchIndex = index; }
    });
    return deletedBatchIndex;
  }

  render() {
    return (
      <div>
        {this.renderStorageSummary()}

        <div className='storage' >
          <div className='container'>
            <div className='row'>
              {this.state.batches.map((item, index) => {
                return this.renderItem(item, index);
              })}
              {
                this.renderEmptyItem()
              }
            </div>
          </div>
        </div >
      </div>
    );
  }
}

export class Input extends React.Component<{}, {}> { }

export class Label extends React.Component<{}, {}> { }

export class Text extends React.Component<{}, {}> { }

export default Storage;
