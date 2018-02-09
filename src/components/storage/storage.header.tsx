import * as React from 'react';
import { I_Header } from './storage.types';

export function Header(props: I_Header) {
  return (
    <h3 className="heading">
      <span className="col-3">#{props.number}</span>
      <span className="col-6">{props.style}</span>
      <span className="col-3">{props.date}</span>
    </h3>
  );
}

export default Header;
