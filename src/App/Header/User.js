import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

const linkStyle = {
  textDecoration: 'none'
};

const User = ({ user }) => {
  const displayName = user && (user.username || user.email);
  const LoggedIn = <div>Howdy {displayName}.  <a href="/auth/logout">Log Out</a></div>;
  const LoggedOut = (
    <div>
      <RaisedButton>
        <Link style={linkStyle} to="/auth/login">Log In</Link>
      </RaisedButton>
      <RaisedButton>
        <Link style={linkStyle} to="/auth/register">Register</Link>
      </RaisedButton>
    </div>
  );

  return (
    <div className="user-wrapper">
      {(user) ? LoggedIn : LoggedOut}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(User);
