import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Bouton from '../Bouton/bouton';
import "./_EditProfileModale.scss"
import { updateUser } from "../../actions/user.actions";
import { getUser } from "../../actions/user.actions";
import { getAll } from "../../actions/post.actions"
import DeleteUser from '../DeleteUser/DeleteUser';

const EditProfileModale = ({revele, cache}) => {

   const userData = useSelector((state) => state.userReducer)
   const dispatch = useDispatch();

   const [profil, setProfil] = useState({
      lastName: "",
      firstName:"",
      picture: "",
      post: ""
   })

   const handleChange = e => {
		if (e.target.name !== "picture") {
			setProfil({ ...profil, [e.target.name]: e.target.value });
		} else {
			setProfil({ ...profil, picture: e.target.files[0] });
		}
	};


   const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
         
         if(profil.lastName === ""){
            formData.append("lastName", userData.lastName);
         }else formData.append("lastName", profil.lastName);   
         
         if(profil.firstName === ""){
            formData.append("firstName", userData.firstName);
         }else formData.append("firstName", profil.firstName);   

         if(profil.post === ""){
            formData.append("post", userData.post);
         }else formData.append("post", profil.post);  

         if(profil.picture === ""){
            formData.append("picture", userData.picture);
         }else formData.append("picture", profil.picture, profil.picture.name);
      
         await dispatch(updateUser(formData));
         dispatch(getUser())
         dispatch(getAll())

         cache()
	};



   if(revele){
      return (
            <>
               <div className="formulaireEditProfile">
                  <form 
                  onSubmit={handleSubmit}
                  className="mt-4"
                  encType="multipart/form-data"
                  >
                     <button className="closeModal" onClick={cache}>x</button>

                     <label htmlFor="exampleInputEmail1" className="login__form--label">Nom</label>
                     <input 
                        type="text"
                        name="lastName" 
                        defaultValue={userData.lastName}
                        onChange={e => handleChange(e)}
                     />
                     <label htmlFor="exampleInputEmail1" className="login__form--label">Prénom</label>
                     <input 
                        type="text"
                        name="firstName" 
                        defaultValue={userData.firstName}
                        onChange={e => handleChange(e)}
                     />
                     <label htmlFor="exampleInputEmail1" className="login__form--label">Post</label>
                     <input 
                        type="text"
                        name="post"
                        defaultValue={userData.post}
                        onChange={e => handleChange(e)}
                     />
                     <label className="label-file" htmlFor="picture"></label>
                     <input
                        type="file"
                        name="picture"
                        id="picture"
                        accept=".jpg, .jpeg, .png"
                        className="form-control-file border"
                        onChange={handleChange}
                     />
                           <Bouton >Modifier mon profil</Bouton>
                           <br />
                           <DeleteUser {...userData}/>
                     </form>
                  </div>
               </>
      )
   }return(null)
      
   

};

export default EditProfileModale;