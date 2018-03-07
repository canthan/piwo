import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import './storage.scss';
import { Item } from './storage.item';
import { CommonStorageService } from './common.service';

import { IBatch } from './storage.types';

export class Storage extends React.Component<{}, { batches: IBatch[] }> {
  public storageData;
  public commonService: CommonStorageService = new CommonStorageService();
  constructor(props) {
    super(props);


    this.state = {
      batches: []
    };
  }

  componentDidMount() {
    this.getStorageData()
      .then((response) => {
        this.storageData = response.data.data;
        this.storageData.batches = this.commonService.formatDateForDisplay(this.storageData.batches);
        this.commonService.calculateQuantities(this.storageData.batches);
        this.setState({ batches: this.storageData.batches });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getStorageData() {
    try {
      return await axios.get('http://localhost:1337/api/v1.0/user_data/1');
    }
    catch (error) {
      console.error(error);
    }
  }

  renderItem(item, index) {
    return (
      <Item item={item} key={index} />
    );
  }

  render() {
    return (
      <div className='storage'>
        <div className='container'>
          <div className='row'>
            {this.state.batches.map((item, index) => {
              return this.renderItem(item, index);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export class Input extends React.Component<{}, {}> { }

export class Label extends React.Component<{}, {}> { }

export class Text extends React.Component<{}, {}> { }

export default Storage;
