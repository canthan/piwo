import * as React from 'react';
import { IHeader } from '../storage.types';

export class EmptyHeader extends React.Component<{ onInputChange }, {}> {

  constructor(props) {
    super(props);
    this.state = {
      batch_name: '',
      batch_id: 0,
      bottled_on: ''
    };
  }

  handleChange = (e) => {
    const changedValue = { [e.target.name]: e.target.value };
    this.props.onInputChange(changedValue);
  }

  render() {
    let currentDate = (new Date()).toISOString();
    currentDate = currentDate.slice(0, currentDate.indexOf('T'));
    return (
      <div className='empty-heading'>
        <div className='col-3'>
          <input type='text' name='batch_id' placeholder='#Number*' className='empty-heading__input' onChange={this.handleChange}></input>
        </div>
        <div className='col-6'>
          <input type='text' name='batch_name' placeholder='Batch Name*' className='empty-heading__input' onChange={this.handleChange}></input>
        </div>
        <div className='col-3'>
          <input type='text' name='bottled_on' placeholder={`${currentDate}*`} className='empty-heading__input' onChange={this.handleChange}></input>
        </div>
      </div>
    );
  }
}

export default EmptyHeader;
