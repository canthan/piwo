import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IStorageSummary, IStorageSummaryProps } from './storage.summary.types';
import StorageSummaryHeaderComponent from './storage.summary.header';

// export class StorageSummary extends React.Component<IStorageSummary, IStorageSummaryProps> {
export class StorageSummaryComponent extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
    // this.state = {

    // }
  }

  render() {
    return (
      <StorageSummaryHeaderComponent />
    );
  }

}

export default StorageSummaryComponent;