import * as React from 'react';
import { IOverallQuantity} from '../storage.types';

export function OverallQuantity(props: IOverallQuantity) {
  return (
    <div className='col-md-2 col-xs-12 quantity'>
      <ul className='quantity-list'>
        <li>{props.quantity_litres.toFixed(2)} Litres</li>
        <li>{props.quantity_bottles} Bottles</li>
        <li>{props.quantity_crates.toFixed(2)} Crates</li>
      </ul>
    </div>
  );
}

export default OverallQuantity;
