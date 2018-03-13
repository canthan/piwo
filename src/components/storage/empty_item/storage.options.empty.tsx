import * as React from 'react';
import { IOptions } from '../storage.types';

export function EmptyOptions(props: IOptions) {

  return (
    <div className='col-12 empty-option-buttons justify-content-center'>
      {props.buttons.map((button, index) => {
        const role = button.split(' ').join('');
        return <OptionsButton key={index} role={button} onButtonClick={props.functions[role]} />;
      })}
    </div>
  );
}

function OptionsButton(props) {
  return (
    <button className='btn btn-primary btn-extra-lg btn-lg' onClick={() => props.onButtonClick()}>{props.role}</button>
  );
}

export default EmptyOptions;