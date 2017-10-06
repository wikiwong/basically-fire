import React from 'react';
import { connect } from 'react-redux';

export default ({ picUrl, width="250", height="250" }) => (
  <div className="prof-pic-img-wrapper">
    <img src={picUrl} height={width} width={width} />
  </div>
);
