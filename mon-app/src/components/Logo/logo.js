import React from 'react';
import Logo from '../../images/icon-above-font.png'
import './_logo.scss'


const logo = (props) => {
   return (
      <div className="logo">
         <img src={Logo} alt="Logo" style={props.style}/>
      </div>
   );
};

export default logo;