import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { StorageHttpService } from '../storage.http.service';
import { CommonStorageService } from '../common.service';
import { EmptyHeaderComponent } from './storage.header.empty';
import { EmptyOptionsComponent } from './storage.options.empty';

import { EmptyBatch, Batch } from '../storage.types';
import { AsyncAction } from '../../../types/app.types';

interface Props {
  addBatch(newBatch: EmptyBatch): AsyncAction;
}

export class EmptyItemComponent extends React.Component<Props, EmptyBatch> {
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
    this.props.addBatch(newBatch);
  }

  render() {
    return (
      <div className='col-xl-6 col-xs-12 itemOverlay'>
        <div className='item'>
          <EmptyHeaderComponent
            onInputChange={this.onInputChange}
            {...this.state} />
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
