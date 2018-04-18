import * as React from 'react';
import { OverallQuantity} from '../storage.types';

interface Props {
  quantity_bottles: number;
  quantity_crates: number;
  quantity_litres: number;
}

export function OverallQuantityComponent(props: Props) {
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
