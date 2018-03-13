import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IStorageSummary, IStorageSummaryProps } from './storage.summary.types';
import StorageSummaryHeader from './storage.summary.header';

// export class StorageSummary extends React.Component<IStorageSummary, IStorageSummaryProps> {
export class StorageSummary extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
    // this.state = {

    // }
  }

  render() {
    return (
      <StorageSummaryHeader />
    );
  }

}

export default StorageSummary;