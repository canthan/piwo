import * as React from 'react';
import { Stash, Bottles, QuantityStorage } from '../storage.types';

interface Props {
  stashes: Stash[];
  modified: boolean;
  onQuantityChange;
  onQuantitySelection;
}

export class StashesComponent extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.modified ? 'col-md-6  col-xs-12 quantity' : 'col-md-6  col-xs-12 quantity  modified'}>
        {this.props.stashes.length > 0 &&
          <QuantityHeaderComponent {...this.props.stashes[0].items} />
        }
        {this.props.stashes.map((stash, index) => {
          return (<QuantityStorageComponent
            key={index}
            stash={stash}
            stashKey={index}
            onQuantityChange={this.props.onQuantityChange}
            onQuantitySelection={this.props.onQuantitySelection} />
          );
        })}
      </div>
    );
}
}

function QuantityHeaderComponent(props: Bottles) {
  return (
    <div className='row'>
      <div className='col-4'></div>
      {
        Object.keys(props)
          .map((item, index) => {
            return (
              <div className='col-2' key={index}>{DecodeVolume(item)}</div>
            );
          })}
    </div>
  );
}

function DecodeVolume(volume: string) {
  return Number(volume.slice(1)) / 100;
}

class QuantityStorageComponent extends React.Component<QuantityStorage, {}> {
  constructor(props) {
    super(props);
  }

  onQuantitySelection = (e, name, stashKey) => {
    const node = e.target.parentNode.parentNode;
    const elements = node.getElementsByClassName('quantity-input');
    for (let i = 0; i < elements.length; i++) {
      elements.item(i).classList.remove('selected');
    }
    e.target.classList.add('selected');
    this.props.onQuantitySelection(e, name, stashKey);
  }

  onQuantityChange = (name, stashKey, target) => {
    this.props.onQuantityChange(name, stashKey, target);
  }

  render() {
    return (
      <div className='row'>
        <div className='col-4'>{this.props.stash.stash_name}</div>
        {
          Object.values(this.props.stash.items)
            .map((item, index) => {
              const name = Object.keys(this.props.stash.items)[index];
              return (
                <input
                  className='col-2 form-control quantity-input'
                  key={index}
                  type='text'
                  name={name}
                  value={item ? item : 0}
                  onClick={(e) => this.onQuantitySelection(e, name, this.props.stashKey)}
                  onChange={(e) => this.onQuantityChange(name, this.props.stashKey, e.target)} />
              );
            })}
      </div>
    );
  }
}

export default StashesComponent;
