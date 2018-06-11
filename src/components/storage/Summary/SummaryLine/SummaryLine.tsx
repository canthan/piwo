import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../Summary.scss';
import { grouppedStash } from '../../storage.types';

interface State {
  stashName: string;
  litres_overall: number;
  bottles_small: number;
  bottles_05: number;
  quantity_crates: {
    overall: number,
    empty: number,
    full: number
  };
}

interface Props {
  stash: grouppedStash,
}

export class StorageSummaryLineComponent extends React.Component<Props, State> {
  state = {
    stashName: this.props.stash.stash_name,
    litres_overall: 0,
    bottles_small: 0,
    bottles_05: this.props.stash.items.b050,
    quantity_crates: {
      overall: 0,
      empty: 0,
      full: 0,
    },
  };

  componentWillUpdate(nextProps: Props) {

  }

  render() {
    return (
      <div className='container summary'>
        <ul className='col-12 summary__list justify-content-around'>
          <li className='col-1'>{this.state.stashName}</li>
          <li className='col-1'>{this.state.litres_overall}</li>
          <li className='col-1'>{this.state.quantity_crates.overall}</li>
          <li className='col-1'>{this.state.quantity_crates.full}</li>
          <li className='col-1'>{this.state.quantity_crates.empty}</li>
          <li className='col-1'>{this.state.bottles_05}</li>
          <li className='col-1'>{this.state.bottles_small}</li>
        </ul>
      </div>
    );
  }
}
