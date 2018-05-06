import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StorageSummaryProps } from './storage.summary.types';

function StorageSummaryLineComponent(props: StorageSummaryProps) {

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
