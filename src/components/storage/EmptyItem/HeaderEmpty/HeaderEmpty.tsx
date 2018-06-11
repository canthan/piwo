import * as React from 'react';
import { EmptyBatch } from '../../storage.types';

import './HeaderEmpty.scss';

interface PropsAction {
  onInputChange;
}

type Props = PropsAction & EmptyBatch;

export class EmptyHeaderComponent extends React.Component<Props> {

  handleChange = e => {
    const changedValue = { [e.target.name]: e.target.value };
    this.props.onInputChange(changedValue);
  }

  render() {
    let currentDate = new Date().toISOString();
    currentDate = currentDate.slice(0, currentDate.indexOf('T'));
    return (
      <div className='empty-heading'>
        <div className='col-3'>
          <input
            type='text'
            name='batch_number'
            value={this.props.batch_number}
            placeholder='#Number*'
            // placeholder={this.state.batch_id.toString()}
            className='empty-heading__input'
            onChange={this.handleChange}
          />
        </div>
        <div className='col-6'>
          <input
            type='text'
            name='batch_name'
            value={this.props.batch_name}
            // placeholder={this.state.batch_name}
            placeholder='Batch Name*'
            className='empty-heading__input'
            onChange={this.handleChange}
          />
        </div>
        <div className='col-3'>
          <input
            type='text'
            name='bottled_on'
            value={this.props.bottled_on}
            // placeholder={this.state.bottled_on}
            placeholder={`${currentDate}*`}
            className='empty-heading__input'
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EmptyHeaderComponent;
