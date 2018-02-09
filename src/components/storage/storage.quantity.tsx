import * as React from 'react';
import { I_Quantity, I_Bottles } from './storage.types';

export class Quantity extends React.Component<{ stashes: I_Quantity[], onQuantityChange }, { /* stashes: I_Quantity[] */ }> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6  col-xs-12 quantity">
        {/* <QuantityHeader {...this.state.stashes[0].items} /> */}
        <QuantityHeader {...this.props.stashes[0].items} />
        {/* {this.state.stashes.map((stash, index) => { */}
        {this.props.stashes.map((stash, index) => {
          return (<QuantityStorage key={index} stash={stash} onQuantityChange={this.props.onQuantityChange} stashKey={index} />
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

class QuantityStorage extends React.Component<{stashKey:number, stash: I_Quantity, onQuantityChange}, {}/* I_Quantity */> {
  constructor(props) {
    super(props);
    // this.state = props;
  }
  
  changeValue = (name, stashKey) => {
    this.props.onQuantityChange(name, stashKey);
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
                  onClick={selectQuantity}
                  onChange={(index) => this.changeValue(name, this.props.stashKey)} />
              )
            })}
      </div>
    )
  }
}

function selectQuantity(e/* : React.SyntheticEvent<HTMLElement> */) {
  const node = e.target.parentNode.parentNode;
  const elements2 = node.getElementsByClassName('quantity-input');
  for (let i = 0; i < elements2.length; i++) {
    elements2.item(i).classList.remove('selected');
  }
  console.log(e.target.attributes);
  console.log(e.target.properties);
  console.log(e.target.itemValue);
  console.log(e.target.parentElement);
  console.log("clicked");
  e.target.classList.add('selected');

}
  
export default Quantity;
