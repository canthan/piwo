import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import StorageComponent from './components/storage/storage';

import { AppState, User, AsyncAction } from './types/app.types';
import {
  StorageState,
  Batch,
  ItemState,
  EmptyBatch
} from './components/storage/storage.types';
import { getUserDataAsync } from './actions/app.actions';
import { OverallAppState } from './reducers/initialState';

import './App.scss';

interface Props {
  app: AppState;
  batches: Batch[];
  emptyBatch: EmptyBatch;
  getUserDataAsync(user_id: number): AsyncAction;
}

// export interface State {
//   app: AppState;
//   storage: StorageState;
//   item: ItemState;
// }

export class App extends React.Component<Props> {

  componentDidMount(): void {
    // const userId = prompt('Select user id (temporary solution)');
    const userId = 1;
    this.getUserData(userId);
  }

  getUserData = (user_id: number): AsyncAction =>
    this.props.getUserDataAsync(user_id);

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ReactSVG path="./assets/img/logo.svg" className="logo-svg" />
          <h1 className="App-title">Storage app</h1>
        </header>
        {/* <StorageComponent user_id={1} batches={this.props.batches}/> */}
        <StorageComponent user_id={1}/>
      </div>
    );
  }
}

const mapStateToProps = (state: OverallAppState) => ({
  app: {
    ...state.app
  },
  batches: state.storage.batches,
  emptyBatch: state.emptyBatch
});

export default connect(mapStateToProps, { getUserDataAsync })(App);
