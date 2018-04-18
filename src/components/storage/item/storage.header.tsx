import * as React from 'react';

export interface Props {
  bottled_on: string;
  batch_id: number;
  batch_name: string;
}

export function HeaderComponent(props: Props) {
  return (
    <h3 className='heading'>
      <span className='col-3'>#{props.batch_id}</span>
      <span className='col-6'>{props.batch_name}</span>
      <span className='col-3'>{props.bottled_on}</span>
    </h3>
  );
}

export default HeaderComponent;
