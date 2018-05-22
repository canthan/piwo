import * as React from 'react';
import './Header.scss';

export interface Props {
  bottled_on: string;
  batch_number: string;
  batch_name: string;
}

export function HeaderComponent(props: Props) {
  const currentDate = new Date();
  const bottlingDate = new Date(props.bottled_on);

  const age = currentDate.getTime() - bottlingDate.getTime();

  return (
    <h3 className="heading">
      <span className="col-3">#{props.batch_number}</span>
      <span className="col-6">{props.batch_name}</span>
      <div className="col-3 heading__dates">
        <span>bottled: {props.bottled_on}</span>
        <span>
          {getDaysFromMiliseconds(age)} days ({getWeeksFromMiliseconds(age)} weeks)
        </span>
      </div>
    </h3>
  );
}

function getDaysFromMiliseconds(miliseconds) {
  return Math.round(miliseconds / 1000 / 60 / 60 / 24);
}

function getWeeksFromMiliseconds(miliseconds) {
  return Math.round(miliseconds / 1000 / 60 / 60 / 24 / 7);
}

export default HeaderComponent;
