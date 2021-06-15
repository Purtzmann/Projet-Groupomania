import React from 'react';
import LogiqueModale from '../LogiqueModale/LogiqueModale';
import EditProfileModale from "../EditProfileModale/EditProfileModale";
import "./_EditProfil.scss"

const EditProfil = (props) => {

   const {revele, toggle} = LogiqueModale();

   return (
      <div className="editProfil">
         <a className="editProfil__text" onClick={toggle} >Editer le profile</a>
         <EditProfileModale
          revele={revele}
          cache={toggle}

         />
      </div>
   );
};

export default EditProfil;