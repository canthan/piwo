import * as React from 'react';
import { I_OverallQuantity} from './storage.types';

export function OverallQuantity(props: I_OverallQuantity) {
  return (
    <div className="col-md-2 col-xs-12 quantity">
      <ul className="quantity-list">
        <li>{props.litres} Litres</li>
        <li>{props.bottles} Bottles</li>
        <li>{props.crates} Crates</li>
      </ul>
    </div>
  );
}

export default OverallQuantity;
