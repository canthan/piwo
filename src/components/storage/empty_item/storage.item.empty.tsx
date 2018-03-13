import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { StorageHttpService } from '../storage.http.service';
import { CommonStorageService } from '../common.service';
import { EmptyHeader } from './storage.header.empty';
import { EmptyOptions } from './storage.options.empty';
import { CEmptyBatch, CBatch } from '../storage.types';

export class EmptyItem extends React.Component<{ afterBatchWasAdded, user_id: number }, CEmptyBatch> {
  public commonService: CommonStorageService = new CommonStorageService();
  public httpService: StorageHttpService = new StorageHttpService();
  constructor(props) {
    super(props);
    this.state = new CEmptyBatch();
  }

  onInputChange = (changedValue) => {
    this.setState(changedValue);
  }

  onAddNewBatchClick = () => {
    const newBatch = this.state;
    newBatch['batch_user_id'] = this.props.user_id;
    this.httpService.addBatch(newBatch, this.props.user_id)
      .then((response) => {
        let newBatch = Object.assign(new CBatch(), response.data.data);
        newBatch = this.commonService.formatDateForDisplay([newBatch])[0];
        this.props.afterBatchWasAdded(newBatch);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='col-xl-6 col-xs-12 itemOverlay'>
        <div className='item'>
          <EmptyHeader
            onInputChange={this.onInputChange} />
          <EmptyOptions
            buttons={['Add new batch']}
            functions={{
              Addnewbatch: this.onAddNewBatchClick,
            }}
          />
        </div>
      </div>
    );
  }
}
