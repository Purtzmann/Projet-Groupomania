import React, {useContext} from "react";
import { useDispatch} from "react-redux";
import Auth from '../../context/Auth';
import { logout } from '../../services/AuthApi';
import Bouton from "../Bouton/bouton";
import { deleteUser } from "../../actions/user.actions";



const DeleteUser = (user) => {
   
   const {setIsAuthenticated} = useContext(Auth);
   const dispatch = useDispatch();

	const handleDeletePost = e => {

      e.preventDefault();
      dispatch(deleteUser(user.id))
      logout()
      setIsAuthenticated(false)
      
	};

   return (
      <div className="">
         <Bouton clic={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) handleDeletePost(e)} }>Supprimer mon profil</Bouton>
      </div>
   );
};
export default DeleteUser;
