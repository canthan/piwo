import * as React from 'react';
import { IHeader } from '../storage.types';

export function Header(props: IHeader) {
  return (
    <h3 className='heading'>
      <span className='col-3'>#{props.batch_id}</span>
      <span className='col-6'>{props.batch_name}</span>
      <span className='col-3'>{props.bottled_on}</span>
    </h3>
  );
}

export default Header;