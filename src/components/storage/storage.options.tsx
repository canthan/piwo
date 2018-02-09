import * as React from 'react';
import { I_Options } from './storage.types';

export function Options(props: I_Options) {
  return (
    <div className="col-12 option-buttons row justify-content-center">
      {props.buttons.map((button, index) => {
        return <OptionsButton key={index} role={button} />
      })}
    </div>
  );
}

function OptionsButton(props) {
  return (
    <button className="btn btn-light">{props.role}</button>
  )
}

export default Options;
