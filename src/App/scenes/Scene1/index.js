import React from 'react';
import { connect } from 'react-redux';

const Scene1 = ({ user }) => (
    <div className="user-wrapper">
        {(user) ? 'Logged in Scene' : 'Logged Out Scene'}
    </div>
);

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Scene1);
