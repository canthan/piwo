import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AnyAction } from 'redux';

import { HeaderComponent } from './storage.header';
import { EmptyHeaderComponent } from '../empty_item/storage.header.empty';
import { OverallQuantityComponent } from './storage.overall.quantity';
import { StashesComponent } from './storage.stashes';
import { ButtonsComponent } from './storage.buttons';
import { OptionsComponent } from './storage.options';
import { Batch, Stash, EmptyBatch } from '../storage.types';
import { CommonStorageService } from '../common.service';

import { AsyncAction } from '../../../types/app.types';

interface Props {
  item: Batch;
  user_id: number;
  deleteBatch(user_id: number, batch_id: number): AsyncAction;
  addStash(batch_id: number, newStash: Stash): AsyncAction;
  editBatchData(batch_id: number, batchData: EmptyBatch): AsyncAction;
  updateStashes(batch_id: number, stashes: Stash[]): AsyncAction;
}

interface State {
  stashes: Stash[];
  selected: any;
  modified: boolean;
  edited: boolean;
  editedBatchData: EmptyBatch;
}

export class ItemComponent extends React.Component<Props, State> {
  state = {
    stashes: this.props.item.stashes,
    selected: undefined,
    modified: false,
    edited: false,
    editedBatchData: {
      batch_name: this.props.item.batch_name,
      batch_number: this.props.item.batch_number,
      bottled_on: this.props.item.bottled_on,
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      stashes: nextProps.item.stashes
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
    this.isInputSelected()
      ? this.onQuantityChange(
          this.state.selected.name,
          this.state.selected.stashKey,
          this.state.selected.target,
          quantity
        )
      : alert('Please select input');
  };

  onAddStorageClick = () => {
    let newStorageName = prompt('Enter new storage name');
    const newState: { stashes: Stash[] } = this.state;
    if (newStorageName) {
      const newStash = new Stash(newStorageName, this.props.item.batch_id);
      newStash['stash_user_id'] = this.props.user_id;
      this.props.addStash(this.props.item.batch_id, newStash);
    }
  };

  onDeleteClick = () => {
    if (
      confirm(
        `Are you sure that Batch no.${this.props.item.batch_number} - ${
          this.props.item.batch_name
        } should be deleted?`
      )
    )
      this.props.deleteBatch(this.props.user_id, this.props.item.batch_id);
  };

  onModeClick = () => {
    console.log(this, 'Mode');
  };

  onSaveClick = () => {
    this.props.updateStashes(this.props.item.batch_id, this.state.stashes);
    this.setState({
      modified: false
    });
  };

  isInputSelected = () => {
    return this.state.selected ? true : false;
  };

  onEditClick = () => {
    if (this.state.edited) {
      this.props.editBatchData(this.props.item.batch_id, this.state.editedBatchData);
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
        ...changedValue,
      }
    });
  };

  render() {
    return (
      <div className="col-xl-6 col-xs-12 itemOverlay">
        <div className="item">
          {this.state.edited ? (
            <EmptyHeaderComponent
              batch_name={this.state.editedBatchData.batch_name}
              batch_number={this.state.editedBatchData.batch_number}
              bottled_on={this.state.editedBatchData.bottled_on}
              onInputChange={this.onInputChange}
            />
          ) : (
            <HeaderComponent
              batch_name={this.props.item.batch_name}
              batch_number={this.props.item.batch_number}
              bottled_on={this.props.item.bottled_on}
            />
          )}
          <section className="content row">
            <OverallQuantityComponent
              quantity_litres={this.props.item.quantity_litres}
              quantity_bottles={this.props.item.quantity_bottles}
              quantity_crates={this.props.item.quantity_crates}
            />
            <StashesComponent
              stashes={this.state.stashes}
              modified={!this.state.modified}
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
    );
  }
}
