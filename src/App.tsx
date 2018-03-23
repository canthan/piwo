import { GetBatchesData, getBatchesDataSuccess } from './actions/storage.actions';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import { StorageComponent } from './components/storage/storage';
import { AppState, User, State } from './types/app.types';
import { getUserData, GetUserData } from './actions/app.actions';
import axios, { AxiosResponse } from 'axios';
import './App.scss';
import { StorageState, Batch } from './components/storage/storage.types';
import { AppStateInterface } from './reducers/initialState';

interface Props {
  getUserData(user_id): GetUserData;
  batches: Batch[];
}

export class App extends React.Component<Props, State> {

  componentDidMount(): void {
    // const userId = prompt('Select user id (temporary solution)');
    const userId = 1;
    this.getUserData(userId);
  }

  getUserData = (user_id): GetUserData => this.props.getUserData(user_id);

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <ReactSVG
            path='./assets/img/logo.svg'
            className='logo-svg'
          />
          <h1 className='App-title'>Storage app</h1>
        </header>
        {<StorageComponent
          user_id = {1}
          batches = {this.props.batches}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => ({
  app: {
    ...state.app,
  },
  batches: state.storage.batches,
  stashes: state.emptyBatch,
});

export default connect(mapStateToProps, { getUserData })(App);
