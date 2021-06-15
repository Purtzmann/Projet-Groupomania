import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AjoutPost from '../../components/AjoutPost/AjoutPost';
import DeletePost from '../../components/DeletePost/DeletePost';
import EditProfil from '../../components/EditProfil/EditProfil';
import Logo from '../../components/Logo/logo';
import Logout from '../../components/Logout/Logout';
import PostComponent from '../../components/PostComponent/PostComponent';
import UserComponent from '../../components/UserComponent/UserComponent';
import { getAll } from '../../actions/post.actions'
import { isEmpty } from '../../components/Utils/Utils'
import Bouton from '../../components/Bouton/bouton';



const Posts = () => {

   const dispatch = useDispatch()
   const messages = useSelector((state) => state.postReducer)
   const [size, setSize] = useState(4);

   const nextPage = () => {
      setSize(size + 4 )
  }

   useEffect(() => {
         dispatch(getAll(size))
   }, [size, dispatch]);

   const userData = useSelector((state) => state.userReducer)

   return (
      <div className="home ">
         
            <div className='home__left col col-sm col-md-6'>
               <div className="left__logo">
                  <Logo className="left__logo--home" style={{width: '150px'}}/>
               </div>
               <div className="left__user">
                  <UserComponent {...userData}/>
               </div>

               <div className="left__editProfile">
                  <EditProfil {...userData}/>
               </div>

               <div className="left__logout">
                  <Logout />
               </div>

            </div>

            <div className='home__right col-12 col-sm-12 col-md-6'>
               <div className="home_user">
                  <div className="right__logo">
                     <Logo className="home__logo--home" style={{width: '100px'}}/>
                  </div>
                  <div className="right__user">
                     <UserComponent {...userData}/>
                  </div>
                  <div className="right__action">
                     <div className="right__editProfile">
                        <EditProfil {...userData}/>
                     </div>
                     <div className="right__logout">
                        <Logout />
                     </div>
                  </div>
               </div>
               <div className="home__ajoutPost">
                  <AjoutPost />
               </div>
               <div className="home__posts">
               {!isEmpty(messages[0]) &&
               messages.map((message, index)=>{
                  return (
                        <div key={message.id}>
                           <PostComponent  {...message} {...message.User} />
                           {!userData.isAdmin
                              ? userData.id === message.UserId && <DeletePost  message={message} size={size}/>
                              : <DeletePost  message={message} size={size}/>
                           }
                        </div>
                     )
               })}
               </div>
               <div className="home__testnewpage">
                  <Bouton clic={nextPage}>Charger plus de message</Bouton>
               </div>

            </div>
      </div>
      
   );
};

export default Posts;