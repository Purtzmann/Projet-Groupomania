import React from "react";
import './_deletePost.scss'
import { useDispatch } from 'react-redux';
import {deletePost, getAll } from '../../actions/post.actions'


const DeletePost = ({message, size}) => {
   const dispatch = useDispatch()

	const handleDeletePost = async (e) => {
      e.preventDefault();
      console.log(message)
      await dispatch(deletePost(message.id))
      dispatch(getAll(size))
	};


   return (
      <div className="deletePost">
         <button className="deletePost__btn" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) handleDeletePost(e)} }>x</button>
      </div>
   );
};
export default DeletePost;

