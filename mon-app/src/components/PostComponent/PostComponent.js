import React from 'react';
import './_postComponent.scss'

const PostComponent = (props) => {

   const handleImage = () =>{
      if(props.attachment != null){
         return(
            <div className="post__Image">
               <img src={props.attachment} alt="image en rapport avec le texte" />
            </div>
         )
      }
   }

   const handleImageProfil = () =>{
      if(props.User.picture === null){
         return(
            <img src="./images/pictureCreation.png" alt="image de profil de l'utilisateur" />
         )
      }else{
         return(<img src={props.User.picture} alt="image de profil de l'utilisateur" />)
      }
   }

  
   
   return (
      <div className="post">
         <div className="post__InfoUser">
            <div className="post__Photo">
            {handleImageProfil()}
            </div>
               <div className="post__Description">
                  <div className="post__Name">{props.User.firstName} {props.User.lastName}</div>
                  <div className="post__Date">{props.createdAt.substr(0 , 10)}</div>
               </div>
            </div>
            <div className="post__Text">
               {props.content}
            </div>
            {handleImage()}

      </div>
   );
};

export default PostComponent;