import React from 'react';
import './style/header.css'


export const Block2 = ({ value, currency1 }) => (
  <div className="header"> 
    <div className="header__inner">
    <div className="exchange__rate">
        <div className="exchange__title">{currency1}</div>
              <span>/</span>
            <div className="exchange__out">{value}</div>
            </div>
  </div>
  </div>
);