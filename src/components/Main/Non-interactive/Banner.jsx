/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import banner from '../../../assets/img/banner.jpg';

function Banner(props) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <h2 className="banner-title">К весне готовы!</h2>
            <img src={banner} className="img-fluid" alt="К весне готовы!" />
          </div>
          {props.children}
        </div>
      </div>
    </main>
  );
}

export default Banner;
