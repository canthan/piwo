import * as React from 'react';
import { Options } from '../storage.types';

export interface Props {
  buttons: string[];
  functions: {
    [buttonFunction: string]: object;
  };
}

export function OptionsComponent(props: Props) {

  return (
    <div className='col-12 option-buttons justify-content-center'>
      {props.buttons.map((button, index) => {
        const role = button.split(' ').join('');
        return <OptionsButton key={index} role={button} onButtonClick={props.functions[role]} />;
      })}
    </div>
  );
}

function OptionsButton(props) {
  return (
    <button className='btn btn-light' onClick={() => props.onButtonClick()}>{props.role}</button>
  );
}

export default OptionsComponent;
