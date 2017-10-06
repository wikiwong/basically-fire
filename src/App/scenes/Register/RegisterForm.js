import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { register } from './actions';
import { empty, confirmMatch } from '../formValidators';

const REGISTER_URL = "http://localhost:8080/auth/register";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formFields) {
    return this.props.register(formFields);
  }

  render() {
    const { pristine, handleSubmit, valid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <Field
            name="username"
            component={TextField}
            floatingLabelText="user name"
            validate={empty}
          />
        </div>

        <div>
          <Field
            name="email"
            component={TextField}
            floatingLabelText="e-mail"
            type="text"
            validate={empty}
          />
        </div>

        <div>
          <Field
            name="password"
            component={TextField}
            floatingLabelText="password"
            type="password"
            validate={empty}
          />
        </div>

        <div>
          <Field
            name="passwordCheck"
            component={TextField}
            floatingLabelText="confirm password"
            type="password"
            validate={(...valueArgs) => confirmMatch('password', ...valueArgs)}
          />
        </div>

        <RaisedButton disabled={(pristine || !valid)} primary={true} fullWidth={true} type="submit">Create Account</RaisedButton>
      </form>
    );
  }
}

export default reduxForm({
  form: 'register'
})(connect(null, { register })(RegisterForm));
