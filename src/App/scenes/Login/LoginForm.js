import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { empty } from '../formValidators';

import { startLogin } from './actions';

const LOGIN_URL = "http://localhost:8080/login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(formFields) {
    await this.props.startLogin(formFields)
    this.props.history.push('/');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <Field
            component={TextField}
            name="username"
            floatingLabelText="user name"
            type="text"
            validate={empty}
          />
        </div>

        <div>
          <Field
            component={TextField}
            name="password"
            floatingLabelText="password"
            type="password"
            validate={empty}
          />
        </div>

        <RaisedButton primary={true} fullWidth={true} type="submit">Log in</RaisedButton>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login'
})(connect(null, { startLogin })(withRouter(LoginForm)));
