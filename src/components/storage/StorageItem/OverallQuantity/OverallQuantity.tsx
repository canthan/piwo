import * as React from 'react';
import { OverallQuantity} from '../../storage.types';

interface Props {
  quantity_bottles: number;
  quantity_crates: number;
  quantity_litres: number;
}

export function OverallQuantityComponent(props: Props) {
  return (
    <div className='col-md-2 col-xs-12 overall'>
      <ul className='overall__list'>
        <li><span className="overall__list__number">{props.quantity_litres.toFixed(2)}</span> Litres</li>
        <li><span className="overall__list__number">{props.quantity_crates.toFixed(2)}</span> Crates</li>
        <li><span className="overall__list__number">{props.quantity_bottles}</span> Bottles</li>
      </ul>
    </div>
  );
}

export default OverallQuantity;
