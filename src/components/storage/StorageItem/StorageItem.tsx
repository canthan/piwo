import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AnyAction } from 'redux';
import { connect, dispatch } from 'react-redux';

import { HeaderComponent } from './Header/Header';
import { EmptyHeaderComponent } from './../EmptyItem/HeaderEmpty/HeaderEmpty';
import { OverallQuantityComponent } from './OverallQuantity/OverallQuantity';
import { StashesComponent } from './Stashes/Stashes';
import { ButtonsComponent } from './Buttons/Buttons';
import { OptionsComponent } from './Options/Options';
import { Batch, Stash, EmptyBatch } from './../storage.types';
import { CommonStorageService } from './../common.service';

import { AsyncAction } from './../../../types/app.types';

import './StorageItem.scss';
import { deleteBatchAsync, addStashAsync, editBatchDataAsync, updateStashesAsync } from '../../../actions/batches.actions';
import { OverallAppState } from '../../../reducers/initialState';

interface OwnProps {
  batch: Batch;
  user_id: number;
  stashes: Stash[];
}
interface MappedBatchActions {
  deleteBatchAsync(user_id: number, batch_id: number): AsyncAction;
  editBatchDataAsync(user_id: number, batch_id: number, batchData: EmptyBatch): AsyncAction;
}
interface MappedStashActions {
  addStashAsync(user_id: number, batch_id: number, newStash: Stash): AsyncAction;
  updateStashesAsync(user_id: number, batch_id: number, stashes: Stash[]): AsyncAction;
}

type Props = MappedBatchActions & MappedStashActions & OwnProps;

interface State {
  stashes: Stash[];
  selected: any;
  modified: boolean;
  edited: boolean;
  editedBatchData: EmptyBatch;
}

export class ItemComponent extends React.Component<Props, State> {
  state = {
    stashes: this.props.stashes,
    selected: undefined,
    modified: false,
    edited: false,
    editedBatchData: {
      batch_name: this.props.batch.batch_name,
      batch_number: this.props.batch.batch_number,
      bottled_on: this.props.batch.bottled_on
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      stashes: nextProps.stashes
    });
  }

  onQuantityChange = (type, stashKey, target, amount = 0) => {
    const newState: { stashes: Stash[] } = this.state;
    newState.stashes[stashKey].items[type] = Number(target.value) + amount;
    this.setState({
      ...newState,
      modified: true
    });
  };

  onQuantitySelection = (e, name, stashKey) => {
    this.setState({
      selected: {
        target: e.target,
        name: name,
        stashKey: stashKey
      }
    });
  };

  onQuantityChangeButton = quantity => {
    const { name, stashKey, target } = this.state.selected;
    this.isInputSelected()
      ? this.onQuantityChange(name, stashKey, target, quantity)
      : alert('Please select input');
  };

  onAddStorageClick = () => {
    let newStorageName = prompt('Enter new storage name');
    if (newStorageName) {
      const { batch: { batch_id }, user_id } = this.props;
      const newStash = new Stash(newStorageName, batch_id);
      newStash['stash_user_id'] = user_id;
      this.props.addStashAsync(user_id, batch_id, newStash);
    }
  };

  onDeleteClick = () => {
    const { batch_number, batch_name } = this.props.batch;
    if (confirm(`Are you sure that Batch no.${batch_number} - ${batch_name} should be deleted?`))
      this.props.deleteBatchAsync(this.props.user_id, this.props.batch.batch_id);
  };

  onModeClick = () => {
    console.log(this, 'Mode');
  };

  onSaveClick = () => {
    const { user_id, batch: { batch_id } } = this.props;
    this.props.updateStashesAsync(user_id, batch_id, this.state.stashes);
    this.setState({
      modified: false
    });
  };

  isInputSelected = () => {
    return this.state.selected ? true : false;
  };

  onEditClick = () => {
    if (this.state.edited) {
      const { user_id, batch: { batch_id } } = this.props;
      this.props.editBatchDataAsync(user_id, batch_id, this.state.editedBatchData);
      this.setState({
        edited: false
      });
    } else {
      this.setState({
        edited: true
      });
    }
  };

  onInputChange = changedValue => {
    this.setState({
      editedBatchData: {
        ...this.state.editedBatchData,
        ...changedValue
      }
    });
  };

  render() {
    const { batch_name, batch_number, bottled_on, quantity_bottles, quantity_crates, quantity_litres } = this.props.batch;
    return (
      <div className="col-xl-6 col-xs-12">
        <div className="itemOverlay">
          <div className={
            this.state.modified
              ? 'item  modified'
              : 'item'
          }>
            {this.state.edited ? (
              <EmptyHeaderComponent
                batch_name={this.state.editedBatchData.batch_name}
                batch_number={this.state.editedBatchData.batch_number}
                bottled_on={this.state.editedBatchData.bottled_on}
                onInputChange={this.onInputChange}
              />
            ) : (
                <HeaderComponent
                  batch_name={batch_name}
                  batch_number={batch_number}
                  bottled_on={bottled_on}
                />
              )}
            <section className="content row">
              <OverallQuantityComponent
                quantity_litres={quantity_litres}
                quantity_bottles={quantity_bottles}
                quantity_crates={quantity_crates}
              />
              <StashesComponent
                stashes={this.props.stashes}
                onQuantityChange={this.onQuantityChange}
                onQuantitySelection={this.onQuantitySelection}
              />
              <ButtonsComponent
                increase={[1, 3, 5]}
                decrease={[-1, -3, -5]}
                onQuantityChangeButton={this.onQuantityChangeButton}
              />
            </section>
            <OptionsComponent
              buttons={['Edit', 'Save', 'Delete', 'Mode', 'Add Storage']}
              functions={{
                Edit: this.onEditClick,
                Save: this.onSaveClick,
                Delete: this.onDeleteClick,
                Mode: this.onModeClick,
                AddStorage: this.onAddStorageClick
              }}
              active={{
                Save: !this.state.modified
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

const actions = {
  deleteBatchAsync,
  addStashAsync,
  editBatchDataAsync,
  updateStashesAsync,
}

export default connect(mapStateToProps, actions)(ItemComponent);
