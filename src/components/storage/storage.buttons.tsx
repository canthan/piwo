import * as React from 'react';
import { IButtons } from './storage.types';

export class Buttons extends React.Component<IButtons, {}> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-md-4 col-xs-12 buttons'>
        <div className='container buttons-row align-items-center'>
          {this.props.increase.map((value, index) => {
            return <IncreaseButton key={index} value={value} onButtonClick={this.props.onButtonClick} />;
          })}
        </div>
        <div className='container buttons-row align-items-center'>
          {this.props.decrease.map((value, index) => {
            return <DecreaseButton key={index} value={value} onButtonClick={this.props.onButtonClick} />;
          })}
        </div>
      </div>
    );
  }
}

function IncreaseButton(props) {
  return (
    <button className='btn btn-success' onClick={() => props.onButtonClick(props.value)}>
      +{props.value}
    </button>
  );
}

function DecreaseButton(props) {
  return (
    <button className='btn btn-danger' onClick={() => props.onButtonClick(props.value)}>
      {props.value}
    </button>
  );
}

function selectQuantity(e) {
  console.log(e);
  console.log('clicked');
}


export default Buttons;
