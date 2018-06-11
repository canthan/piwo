import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactSVG from 'react-svg';
import { connect } from 'react-redux';

import StorageComponent from './components/storage/storage';

import { AsyncAction } from './types/app.types';

import { getUserDataAsync } from './actions/app.actions';
import { OverallAppState } from './reducers/initialState';

import './App.scss';

interface Props {
  user_id: number;
  getUserDataAsync(user_id: number): AsyncAction;
}

export class App extends React.Component<Props> {

  componentDidMount(): void {
    const userId = 1;
    this.getUserData(userId);
  }

  getUserData = (user_id: number): AsyncAction =>
    this.props.getUserDataAsync(user_id);

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Storage app</h1>
        </header>
        <StorageComponent user_id={this.props.user_id} />
      </div>
    );
  }
}

const mapStateToProps = (state: OverallAppState) => ({
  user_id: state.app.user.user_id,
});

export default connect(mapStateToProps, { getUserDataAsync })(App);
