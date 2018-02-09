import * as React from 'react';
import { I_Buttons } from './storage.types';

export function Buttons(props: I_Buttons) {
  return (
    <div className="col-md-4 col-xs-12 buttons">
      <div className="container buttons-row align-items-center">
        {props.increase.map((value, index) => {
          return <IncreaseButton key={index} value={value} />
        })}
      </div>
      <div className="container buttons-row align-items-center">
        {props.decrease.map((value, index) => {
          return <DecreaseButton key={index} value={value} />
        })}
      </div>
    </div>
  );
}

function IncreaseButton(props) {
  return (
    <button className="btn btn-success" onClick={selectQuantity}>
      +{props.value}
    </button>
  );
}
function DecreaseButton(props) {
  return (
    <button className="btn btn-danger" onClick={() => console.log(`-${props.value}`)}>
      -{props.value}
    </button>
  );
}

function selectQuantity(e) {
  console.log(e);
  console.log("clicked");

}


export default Buttons;
