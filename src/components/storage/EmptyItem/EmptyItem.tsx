import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { CommonStorageService } from '../common.service';
import { EmptyHeaderComponent } from './HeaderEmpty/HeaderEmpty';
import { EmptyOptionsComponent } from './OptionsEmpty/OptionsEmpty';

import { EmptyBatch, Batch } from '../storage.types';
import { AsyncAction } from '../../../types/app.types';
import { OverallAppState } from '../../../reducers/initialState';
import { addBatchAsync } from '../../../actions/batches.actions';

interface MappedActions {
  addBatchAsync(user_id: number, newBatch: EmptyBatch): AsyncAction;
}

interface MappedProps {
  user_id: number;
}

type Props = MappedActions & MappedProps;

export class EmptyItemComponent extends React.Component<Props, EmptyBatch> {
  state = new EmptyBatch();

  onInputChange = changedValue => {
    this.setState(changedValue);
  };

  onAddNewBatchClick = () => {
    const newBatch = this.state;
    this.props.addBatchAsync(this.props.user_id, newBatch);
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

const mapStateToProps = (state: OverallAppState) => ({
  user_id: state.app.user.user_id,
});


export default connect(mapStateToProps, { addBatchAsync })(EmptyItemComponent);
