import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CommonStorageService } from '../common.service';
import { EmptyHeaderComponent } from './HeaderEmpty/HeaderEmpty';
import { EmptyOptionsComponent } from './OptionsEmpty/OptionsEmpty';

import { EmptyBatch, Batch } from '../storage.types';
import { AsyncAction } from '../../../types/app.types';

interface Props {
  addBatch(newBatch: EmptyBatch): AsyncAction;
}

export class EmptyItemComponent extends React.Component<Props, EmptyBatch> {
  state = new EmptyBatch();

  onInputChange = changedValue => {
    this.setState(changedValue);
  };

  onAddNewBatchClick = () => {
    const newBatch = this.state;
    this.props.addBatch(newBatch);
  };

  render() {
    return (
      <div className="col-xl-6 col-xs-12">
        <div className="itemOverlay">
          <div className="item">
            <EmptyHeaderComponent
              onInputChange={this.onInputChange}
              {...this.state}
            />
            <EmptyOptionsComponent
              buttons={['Add new batch']}
              functions={{
                Addnewbatch: this.onAddNewBatchClick
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
