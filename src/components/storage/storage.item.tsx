import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './storage.header';
import { OverallQuantity } from './storage.overall.quantity';
import { Quantity } from './storage.quantity';
import { Buttons } from './storage.buttons';
import { Options } from './storage.options';
import { I_Item, I_Quantity } from './storage.types';

export class Item extends React.Component<{ item: I_Item }, { stashes: I_Quantity[] }> {

  constructor(props) {
    super(props);
    this.state = {
      stashes: props.item.stashes
    };
  }

  handleQuantityChange = (name, stashKey) => {
    console.log(this.state);
    const newState: {stashes:I_Quantity[] } = this.state;
    newState.stashes[stashKey].items[name]++
    this.setState({
      ...newState
    })
  }

  render() {
    return (
      <div className="col-xl-6 col-xs-12 itemOverlay">
        <div className="item">
          <Header
            style={this.props.item.name}
            number={this.props.item.number}
            date={this.props.item.date} />
          <section className="content row">
            <OverallQuantity
              litres={this.props.item.quantity_l}
              crates={this.props.item.quantity_c}
              bottles={this.props.item.quantity_b} />
            {/* <Quantity
              quantity={this.props.item.stashes}
            /> */}
            <Quantity
              stashes={this.state.stashes}
              onQuantityChange={this.handleQuantityChange}
            />
            <Buttons
              increase={[1, 3, 5]}
              decrease={[1, 3, 5]}
            />
          </section>
          <Options
            buttons={["Edit", "Save", "Delete", "Mode"]}
          />
        </div>
      </div>
    )
  }
}
