import React ,{useState, useEffect, useContext} from 'react';
import Logo from '../../../components/Logo/logo';
import Bouton from '../../../components/Bouton/bouton'
import Auth from '../../../context/Auth'
import { login } from '../../../services/AuthApi';

const Login = ({history}) =>{

   const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

   const [user, setUser] = useState({
      email: "",
      password:""
   });

   const handleChange = ({currentTarget}) =>{
      const {name, value } = currentTarget;
      setUser({...user, [name]: value})
   }


   const handleSubmit = async event =>{
      event.preventDefault();
      try{
         const response = await login(user)
         setIsAuthenticated(response)
         history.replace('/posts')
      }catch ({response}){
         // return 
         if(response.status === 401){
            let error = document.querySelector('.error')
            error.className = "error--active"

         }
      }
   }


   const handleRegister = () =>{
      history.replace('/register')
   }

   useEffect(() => {
      if(isAuthenticated){
         history.replace('/posts')
      }
     
   }, [history, isAuthenticated]);


   return(

         <div className="login">
            <div className="login__left col-sm col-md-6">
               <div className="login__left--logo">
                  <Logo />
               </div>
            </div>
            <div className="login__right col-12 col-sm-12 col-md-6">
               <div className="login__connexion">
                  <div className="login__right--logo">
                        <Logo />
                  </div>
                  <div className="login__form">
                     <form onSubmit={handleSubmit}>
                           <div className="mb-3">
                              <label htmlFor="exampleInputEmail1" className="login__form--label">Email</label>
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
                              <label htmlFor="exampleInputPassword1" className="login__form--label">Password</label>
                              <input 
                                 type="password"
                                 name="password" 
                                 id="password"
                                 className="form-control"   
                                 onChange={handleChange}
                              />
                              <div className="error">Erreur mail ou password</div>
                           </div>
                           <div className="mb-3 form-check">
                              <input 
                                 type="checkbox" 
                                 className="form-check-input" 
                                 id="exampleCheck1"
                              />
                              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                           </div>
                           <div className="form-group">
                           <Bouton>CONNEXION</Bouton>
                           <a onClick={handleRegister} href="/register">Creation d'un compte</a>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>

   )
}

export default Login;