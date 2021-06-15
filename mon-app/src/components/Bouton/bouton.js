import React from 'react';
import './_bouton.scss'

const bouton = (props) => {
   return (
      <div>
         <button type="submit" className="btn btn-primary btn__login" onClick={props.clic}>{props.children}</button>
      </div>
   );
};

export default bouton;