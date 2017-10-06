import React from 'react';
import { connect } from 'react-redux';
import Pic from './Pic';
import providerSelector from './providerSelector';

const style = {
  textAlign: 'center'
};

class Profile extends React.Component {
  render() {
    return (
      <div className="profile" style={style}>
        <Pic picUrl={this.props.picUrl} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const provider = providerSelector(state);
  return {
    picUrl: provider && provider.photoURL
  };
}

export default connect(mapStateToProps)(Profile);
