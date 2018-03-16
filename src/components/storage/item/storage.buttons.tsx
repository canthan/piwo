import * as React from 'react';
import { Buttons } from '../storage.types';

export class ButtonsComponent extends React.Component<Buttons, {}> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-md-4 col-xs-12 buttons'>
        <div className='container buttons-row align-items-center'>
          {this.props.increase.map((value, index) => {
            return <IncreaseButton key={index} value={value} onQuantityChangeButton={this.props.onQuantityChangeButton} />;
          })}
        </div>
        <div className='container buttons-row align-items-center'>
          {this.props.decrease.map((value, index) => {
            return <DecreaseButton key={index} value={value} onQuantityChangeButton={this.props.onQuantityChangeButton} />;
          })}
        </div>
      </div>
    );
  }
}

function IncreaseButton(props) {
  return (
    <button className='btn btn-success' onClick={() => props.onQuantityChangeButton(props.value)}>
      +{props.value}
    </button>
  );
}

function DecreaseButton(props) {
  return (
    <button className='btn btn-danger' onClick={() => props.onQuantityChangeButton(props.value)}>
      {props.value}
    </button>
  );
}

export default ButtonsComponent;
