import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';

const EmailSent = (props) => (
  <div>
    <div>Verification e-mail sent!</div>
    <FaEnvelopeO {...props} />
  </div>
);

EmailSent.PropTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

export default EmailSent;
