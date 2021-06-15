
import React, {useContext} from 'react';
import Auth from '../../context/Auth';
import { logout } from '../../services/AuthApi';
import './_logout.scss'

const Logout = () => {

   const { setIsAuthenticated} = useContext(Auth);

   const handleLogout = () =>{
      logout()
      setIsAuthenticated(false)
   }

   return (
      <div className="logout">
         <a className="logout__text" onClick={handleLogout} href="/#">Deconnexion </a>
      </div>
   );
};

export default Logout;