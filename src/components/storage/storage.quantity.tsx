import * as React from 'react';
import { I_Quantity, I_Bottles, I_QuantityStorage } from './storage.types';

export class Quantity extends React.Component<{ stashes: I_Quantity[], onQuantityChange, onQuantitySelection }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6  col-xs-12 quantity">
        <QuantityHeader {...this.props.stashes[0].items} />
        {this.props.stashes.map((stash, index) => {
          return (<QuantityStorage 
            key={index} 
            stash={stash}
            stashKey={index} 
            onQuantityChange={this.props.onQuantityChange} 
            onQuantitySelection={this.props.onQuantitySelection} />
          )
        })}
      </div>
    )
  }
}

function QuantityHeader(props: I_Bottles) {
  return (
    <div className="row">
      <div className="col-4"></div>
      {
        Object.keys(props)
          .map((item, index) => {
            return (
              <div className="col-2" key={index}>{DecodeVolume(item)}</div>
            )
          })}
    </div>
  );
}

function DecodeVolume(volume: string) {
  return Number(volume.slice(1)) / 100;
}

class QuantityStorage extends React.Component< I_QuantityStorage, {}> {
  constructor(props) {
    super(props);
  }

  onQuantitySelection = (e, name, stashKey) => {
    const node = e.target.parentNode.parentNode;
    const elements2 = node.getElementsByClassName('quantity-input');
    for (let i = 0; i < elements2.length; i++) {
      elements2.item(i).classList.remove('selected');
    }
    e.target.classList.add('selected');
    this.props.onQuantitySelection(e, name, stashKey);
  }
  
  onQuantityChange = (name, stashKey, target) => {
    this.props.onQuantityChange(name, stashKey, target);
  }

  render() {    
    return (
      <div className="row">
        <div className="col-4">{this.props.stash.name}</div>
        {
          Object.values(this.props.stash.items)
            .map((item, index) => {
              // const name = Object.keys(this.state.items)[index];
              const name = Object.keys(this.props.stash.items)[index];
              return (
                <input
                  className="col-2 form-control quantity-input"
                  key={index}
                  type="text"
                  name={name}
                  value={item}
                  onClick={(e) => this.onQuantitySelection(e, name, this.props.stashKey)}
                  onChange={(e) => this.onQuantityChange(name, this.props.stashKey, e.target)} />
              )
            })}
      </div>
    )
  }
}
 
export default Quantity;
