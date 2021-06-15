import React from 'react';
import './_userComponent.scss'

const UserComponent = (props) => {

   const handleImage = () =>{
      if(props.picture === null){
         return(
            <img src="./images/pictureCreation.png" alt="img-log" />
         )
      }else{
         return(<img src={props.picture} alt="img-log" />)
      }
   }

   return (
      <div className="user">
         <div className="user__ImageProfil">{handleImage()}</div>
         <div className="user__InfoProfil">
            <div>Nom: {props.lastName} </div>
            <div>Prenom: {props.firstName} </div>
            <div>Post: {props.post}</div>
         </div>
      </div>

   );
};

export default UserComponent;