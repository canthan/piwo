import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import { StorageComponent } from './components/storage/storage';
import { AppState, User } from './types/app.types';
import { getUserData, GetUserData } from './actions/app.actions';
import axios, { AxiosResponse } from 'axios';
import './App.scss';

interface Props {
  getUserData(user_id): GetUserData;
}

interface State {
  app: AppState;
}

export class App extends React.Component<Props, State> {

  // constructor(props) {
  //   super(props);
    // this.state = {
    //   loaded: true,
    //   loggedIn: false,
    //   user: {
    //     user_id: 0,
    //     username: '',
    //     firstname: '',
    //     surname: '',
    //     email: ''
    //   }
    // };
  // }

  componentDidMount(): void {
    // const userId = prompt('Select user id (temporary solution)');
    const userId = 1;
    this.getUserData(userId);
    // this.getUserData(userId)
    //   .then((response: AxiosResponse<{ data: User }>) => {
    //     this.setState({
    //       app: {
    //         loaded: true,
    //         loggedIn: true,
    //         user: {
    //           user_id: response.data.data.user_id,
    //           username: response.data.data.username,
    //           firstname: response.data.data.firstname,
    //           surname: response.data.data.surname,
    //           email: response.data.data.email,
    //         }
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  getUserData = (user_id): GetUserData => this.props.getUserData(user_id);

  // async getUserData(user_id) {
  //   try {
  //     return await axios.get(`http://localhost:1337/api/v1.0/users/${user_id}`);
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

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
        <StorageComponent
          user_id = {1}
          // user_id={this.state.app.user.user_id}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserData })(App);
