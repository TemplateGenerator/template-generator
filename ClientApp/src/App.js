import React, { Component, useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { DownloadCenter } from './components/DownloadCenter';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import axios from 'axios';

import './custom.css'
import SignIn from './components/SignIn';
import { ForgotPassword } from './components/ForgotPassword';
import { ForcePasswordChange } from './components/ForcePasswordChange';
import { Admin } from './components/Admin';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  static displayName = App.name;
  //constructor(props){
  //  super(props);
  //    this.state = {
  //        isAuthenticated: true
  //  };
  //}

  //  componentDidUpdate() {
  //      axios({
  //          method: 'GET',
  //          url: '/accounts/isauthenticated'
  //      }).then(res => {
  //          this.setState({
  //              isAuthenticated: res.data
  //          })
  //      });
  //      console.log(this.state.isAuthenticated);
  //}

  render () {
    return (
      <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        />
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/admin' component={Admin}/>
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/forcepasswordchange' component={ForcePasswordChange} />
        <Route exact path='/forgotpassword' component={ForgotPassword} />
        <Route exact path='/download-center' component={DownloadCenter} />
        {/*<Route path='/counter' component={Counter} />*/}
        {/*<Route path='/fetch-data' component={FetchData} />*/}
      </Layout>
      </>
    );
  }
}
