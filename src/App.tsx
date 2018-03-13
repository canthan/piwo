import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactSVG from 'react-svg';
import { Storage } from './components/storage/storage';
import { IAppState, IUser } from './app.types';
import axios, { AxiosResponse } from 'axios';
import './App.scss';

export default class App extends React.Component<{}, IAppState> {

  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      loggedIn: false,
      user: {
        user_id: 0,
        username: '',
        firstname: '',
        surname: '',
        email: ''
      }
    };
  }

  componentDidMount() {
    // const userId = prompt('Select user id (temporary solution)');
    const userId = 1;
    this.getUserData(userId)
      .then((response: AxiosResponse<{ data: IUser }>) => {
        this.setState({
          loaded: true,
          loggedIn: true,
          user: {
            user_id: response.data.data.user_id,
            username: response.data.data.username,
            firstname: response.data.data.firstname,
            surname: response.data.data.surname,
            email: response.data.data.email,
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getUserData(user_id) {
    try {
      return await axios.get(`http://localhost:1337/api/v1.0/users/${user_id}`);
    }
    catch (error) {
      console.error(error);
    }
  }

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
        <Storage
          user_id={this.state.user.user_id}
        />
      </div>
    );
  }
}

