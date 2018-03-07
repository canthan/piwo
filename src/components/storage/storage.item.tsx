import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { Header } from './storage.header';
import { OverallQuantity } from './storage.overall.quantity';
import { Quantity } from './storage.quantity';
import { Buttons } from './storage.buttons';
import { Options } from './storage.options';
import { IBatch, IQuantity } from './storage.types';
import { CommonStorageService } from './common.service';

export class Item extends React.Component<{ item: IBatch }, { stashes: IQuantity[], selected: any }> {
  public commonService: CommonStorageService = new CommonStorageService();
  constructor(props) {
    super(props);
    this.state = {
      stashes: props.item.stashes,
      selected: undefined
    };
  }

  onQuantityChange = (type, stashKey, target, amount = 0) => {
    const newState: { stashes: IQuantity[] } = this.state;
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

  onButtonClick = (quantity) => {
    this.isInputSelected() ?
      this.onQuantityChange(this.state.selected.name, this.state.selected.stashKey, this.state.selected.target, quantity) :
      alert('Please select input');
  }

  onEditClick = () => {
    console.log(this, 'Edit');
  }

  onSaveClick = () => {
    this.updateStashes()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onDeleteClick = () => {
    console.log(this, 'Delete');
  }

  onModeClick = () => {
    console.log(this, 'Mode');
  }

  onAddStorageClick = () => {
    console.log(this.state);
    console.log(this.props);

    let newStorageName = prompt('Enter new storage name');
    const newState: { stashes: IQuantity[] } = this.state;
    // const newState = JSON.parse(JSON.stringify(this.state));
    if (newStorageName) {
      const newStash = new IQuantity(newStorageName, this.props.item.batch_number);
      newStash['stashes_user_id'] = 1; // hardcoded to be chagned later;
      console.log(newStash);
      this.addStash(newStash);
      newState.stashes.push(newStash);
    }
    console.log(newState);
    this.setState(newState);
  }

  async addStash(newStash) {
    try {
      return await axios.post(
        `http://localhost:1337/api/v1.0/stashes/1/${this.props.item.batch_number}`,
        this.commonService.flattenItemsForRequest([newStash])
      );
    }
    catch (error) {
      console.error(error);
    }
  }

  async updateStashes() {
    try {
      return await axios.put(
        `http://localhost:1337/api/v1.0/stashes/1/${this.props.item.batch_number}`,
        this.commonService.flattenItemsForRequest(this.state.stashes)
      ); // hardcode user no. 1
    }
    catch (error) {
      console.error(error);
    }
  }

  isInputSelected = () => { return this.state.selected ? true : false; };

  render() {
    return (
      <div className='col-xl-6 col-xs-12 itemOverlay'>
        <div className='item'>
          <Header
            batch_name={this.props.item.batch_name}
            batch_number={this.props.item.batch_number}
            bottled_on={this.props.item.bottled_on} />
          <section className='content row'>
            <OverallQuantity
              quantity_litres={this.props.item.quantity_litres}
              quantity_bottles={this.props.item.quantity_bottles}
              quantity_crates={this.props.item.quantity_crates} />
            <Quantity
              stashes={this.state.stashes}
              onQuantityChange={this.onQuantityChange}
              onQuantitySelection={this.onQuantitySelection}
            />
            <Buttons
              increase={[1, 3, 5]}
              decrease={[-1, -3, -5]}
              onButtonClick={this.onButtonClick}
            />
          </section>
          <Options
            buttons={['Edit', 'Save', 'Delete', 'Mode', 'Add Storage']}
            functions={{
              Edit: this.onEditClick,
              Save: this.onSaveClick,
              Delete: this.onDeleteClick,
              Mode: this.onModeClick,
              AddStorage: this.onAddStorageClick,
            }}
          />
        </div>
      </div>
    );
  }
}
