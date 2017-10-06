import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// app wide
import Header from './Header';
import SideNav from './SideNav';

// routes
import Scene1 from './scenes/Scene1';
import Login from './scenes/Login';
import Register from './scenes/Register';

import Profile from './scenes/Profile';

const contentStyle = {
  width: '100%',
  textAlign: 'center'
};

const App = () => (
  <div>
    <Header />
    <div className="app-content-container" style={contentStyle}>
      <SideNav />
      <div className="content-container" style={{ display: 'inline-block', textAlign: 'center' }}>
        <Route path="/auth/register" component={Register} />
        <Route path="/auth/login" component={Login} />
        <Route path="/profile/:uid" component={Profile} />
        <Route path="/scene1" component={Scene1} />
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ user }) => ({ user });

// export default connect(mapStateToProps)(App);
export default App;
