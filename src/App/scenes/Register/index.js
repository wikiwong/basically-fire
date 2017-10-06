import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Status } from './enums';
import RegisterForm from './RegisterForm';
import EmailSent from './EmailSent';

const style = {
  textAlign: 'center'
};

class Register extends React.Component {
  render() {
    const { register: { status }, user } = this.props;
    if (user) {
      return <span>You are already logged in!</span>;
    } else if (status === Status.Verifying) {
      return <EmailSent size={100} width={100} />;
    }
    return (
      <div className="register" style={style}>
        <RegisterForm />
      </div>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = ({ register, user }) => ({ register, user });

export default connect(mapStateToProps)(Register);
