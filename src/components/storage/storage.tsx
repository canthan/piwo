import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './storage.scss';
import { Item } from './storage.item';

import { I_Item } from './storage.types';

export class Storage extends React.Component<{}, { stashes: I_Item[] }> {
  constructor(props) {
    super(props);
    const StorageMock: I_Item[] = require('./storage.json').storage;

    this.state = { stashes: StorageMock };
    console.log('Storage init');
  };

  renderItem(item, index) {
    return (
      <Item item={item} key={index} />
    )
  }

  render() {
    return (
      <div className="storage">
        <div className="container">
          <div className="row">
            {this.state.stashes.map((item, index) => {
              return this.renderItem(item, index);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export class Input extends React.Component<{}, {}> {

}

export class Label extends React.Component<{}, {}> {

}

export class Text extends React.Component<{}, {}> {

}


export default Storage
