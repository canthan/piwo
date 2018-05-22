import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
  stashName: string;
  litres_overall: number;
  litres_in_05: number;
  bottles_small: number;
  bottles_05: number;
  quantity_crates: {
    overall: number,
    empty: number,
    full: number
  };
}

function StorageSummaryLineComponent(props: Props) {

  return (
    <div className='container summary'>
      <ul className='col-12 summary__list justify-content-around'>
        <li className='col-1'>{props.stashName}</li>
        <li className='col-1'>{props.litres_overall}</li>
        <li className='col-1'>{props.litres_in_05}</li>
        <li className='col-1'>{props.bottles_small}</li>
        <li className='col-1'>{props.bottles_05}</li>
        <li className='col-1'>{props.quantity_crates.overall}</li>
        <li className='col-1'>{props.quantity_crates.empty}</li>
        <li className='col-1'>{props.quantity_crates.full}</li>
      </ul>
    </div>
  );
}

export default StorageSummaryLineComponent;
