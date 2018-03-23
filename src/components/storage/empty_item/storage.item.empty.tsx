import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { StorageHttpService } from '../storage.http.service';
import { CommonStorageService } from '../common.service';
import { EmptyHeaderComponent } from './storage.header.empty';
import { EmptyOptionsComponent } from './storage.options.empty';
import { EmptyBatch, Batch } from '../storage.types';

interface Props {
  afterBatchWasAdded;
  user_id: number;
}

export class EmptyItemComponent extends React.Component<Props, EmptyBatch> {
  public commonService: CommonStorageService = new CommonStorageService();
  public httpService: StorageHttpService = new StorageHttpService();
  constructor(props) {
    super(props);
    this.state = new EmptyBatch();
  }

  onInputChange = (changedValue) => {
    this.setState(changedValue);
  }

  onAddNewBatchClick = () => {
    const newBatch = this.state;
    newBatch['batch_user_id'] = this.props.user_id;
    this.httpService.addBatch(newBatch, this.props.user_id)
      .then((response) => {
        let newBatch = Object.assign(new Batch(), response.data.data);
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
          <EmptyHeaderComponent
            onInputChange={this.onInputChange} />
          <EmptyOptionsComponent
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
