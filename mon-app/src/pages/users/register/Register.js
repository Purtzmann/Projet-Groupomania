import React ,{useState} from 'react';
import Logo from '../../../components/Logo/logo';
import Bouton from '../../../components/Bouton/bouton'

import { signup } from '../../../services/AuthApi';

const Register = ({history}) =>{

   const [user, setUser] = useState({
      lastName:"",
      firstName:"",
      post:"",
      email: "",
      password:"",
   });

   const handleChange = ({currentTarget}) =>{
      const {name, value } = currentTarget;
      setUser({...user, [name]: value})
   }

   const handleSubmit = async event =>{
      event.preventDefault();
      try{
         await signup(user)
         history.replace('/')
      }catch ({ response}){
         console.log(response)
      }
   }

   const handleLogin = () =>{
      history.replace('/')
   }

   return(

         <div className="register">
            <div className="register__left col-sm col-md-6">
               <div className="register__left--logo">
                  <Logo />
               </div>
            </div>
            <div className="register__right col-12 col-sm-12 col-md-6">
               <div className="register__connexion">
                  <div className="register__right--logo">
                     <Logo />
                  </div>
                  <div className="register__form">
                     <form onSubmit={handleSubmit}>
                           <div className="mb-3">
                              <label htmlFor="" className="register__form--label">Nom</label>
                              <input 
                                 type="text"
                                 name="lastName" 
                                 className="form-control" 
                                 id="lastName"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="mb-3">
                              <label htmlFor="" className="register__form--label">Prénom</label>
                              <input 
                                 type="text"
                                 name="firstName" 
                                 className="form-control" 
                                 id="firstName"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="mb-3">
                              <label htmlFor="" className="register__form--label">Post</label>
                              <input 
                                 type="text"
                                 name="post" 
                                 className="form-control" 
                                 id="post"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="mb-3">
                              <label htmlFor="exampleInputEmail1" className="register__form--label">Email</label>
                              <input 
                                 type="text"
                                 name="email" 
                                 className="form-control" 
                                 id="email"
                                 placeholder="email@nomdedomaine.com"
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="mb-3">
                              <label htmlFor="exampleInputPassword1" className="register__form--label">Password</label>
                              <input 
                                 type="password"
                                 name="password" 
                                 id="password"
                                 className="form-control"   
                                 onChange={handleChange}
                              />
                           </div>
                           <div className="form-group">
                           <Bouton>S'enregister</Bouton>
                           <a onClick={handleLogin} href="/#">J'ai déja un compte</a>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>

   )
}

export default Register;