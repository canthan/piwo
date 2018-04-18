import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AnyAction } from 'redux';

import { HeaderComponent } from './storage.header';
import { OverallQuantityComponent } from './storage.overall.quantity';
import { StashesComponent } from './storage.stashes';
import { ButtonsComponent } from './storage.buttons';
import { OptionsComponent } from './storage.options';
import { Batch, Stash } from '../storage.types';
import { CommonStorageService } from '../common.service';
import { StorageHttpService } from '../storage.http.service';

import { AsyncAction } from '../../../types/app.types';

interface Props {
  item: Batch;
  user_id: number;
  deleteBatch(user_id: number, batch_id: number): AsyncAction;
}

interface State {
  stashes: Stash[];
  selected: any;
}

export class ItemComponent extends React.Component<Props, State> {
  public commonService: CommonStorageService = new CommonStorageService();
  public httpService: StorageHttpService = new StorageHttpService();
  constructor(props) {
    super(props);
    this.state = {
      stashes: props.item.stashes,
      selected: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stashes: nextProps.item.stashes
    });
  }

  onQuantityChange = (type, stashKey, target, amount = 0) => {
    const newState: { stashes: Stash[] } = this.state;
    newState.stashes[stashKey].items[type] = Number(target.value) + amount;
    this.setState({
      ...newState
    });
  }

  onQuantitySelection = (e, name, stashKey) => {
    this.setState({
      selected: {
        target: e.target,
        name: name,
        stashKey: stashKey
      }
    });
  }

  onQuantityChangeButton = quantity => {
    this.isInputSelected()
      ? this.onQuantityChange(
          this.state.selected.name,
          this.state.selected.stashKey,
          this.state.selected.target,
          quantity
        )
      : alert('Please select input');
  }

  onAddStorageClick = () => {
    let newStorageName = prompt('Enter new storage name');
    const newState: { stashes: Stash[] } = this.state;
    if (newStorageName) {
      const newStash = new Stash(newStorageName, this.props.item.batch_id);
      newStash['stash_user_id'] = this.props.user_id;
      this.httpService
        .addStash(newStash, this.props.user_id, this.props.item.batch_id)
        .then(response => {
          const responseStash = response.data.data[0];
          newState.stashes.push(responseStash);
          this.setState(newState);
        });
    }
  }

  onDeleteClick = () => {
    confirm(
      `Are you sure that Batch no.${this.props.item.batch_id} - ${
        this.props.item.batch_name
      } should be deleted?`
    );
    this.props.deleteBatch(this.props.user_id, this.props.item.batch_id);
  }
  // onDeleteClick = () => {
  //   confirm(`Are you sure that Batch no.${this.props.item.batch_id} - ${this.props.item.batch_name} should be deleted?`);
  //   this.httpService.deleteBatch(this.props.user_id, this.props.item.batch_id)
  //     .then((response) => {
  //       console.log(response)
  //       this.props.afterBatchWasDeleted(this.props.item.batch_id);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  onEditClick = () => {
    console.log(this, 'Edit');
  }

  onModeClick = () => {
    console.log(this, 'Mode');
  }

  onSaveClick = () => {
    this.httpService
      .updateStashes(
        this.state.stashes,
        this.props.user_id,
        this.props.item.batch_id
      )
      .then(response => {})
      .catch(error => {
        console.error(error);
      });
  }

  isInputSelected = () => {
    return this.state.selected ? true : false;
  }

  render() {
    return (
      <div className='col-xl-6 col-xs-12 itemOverlay'>
        <div className='item'>
          <HeaderComponent
            batch_name={this.props.item.batch_name}
            batch_id={this.props.item.batch_id}
            bottled_on={this.props.item.bottled_on}
          />
          <section className='content row'>
            <OverallQuantityComponent
              quantity_litres={this.props.item.quantity_litres}
              quantity_bottles={this.props.item.quantity_bottles}
              quantity_crates={this.props.item.quantity_crates}
            />
            <StashesComponent
              stashes={this.state.stashes}
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
          />
        </div>
      </div>
    );
  }
}
