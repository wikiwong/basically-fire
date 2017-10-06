import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const style = {
  textAlign: 'center'
};

class Login extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="login" style={style}>
        <LoginForm />
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object
};

export default Login;
