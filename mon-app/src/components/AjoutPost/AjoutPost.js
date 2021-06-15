import React, {useState} from 'react';
import Bouton from '../Bouton/bouton';
import './_ajoutPost.scss'
import { useDispatch } from 'react-redux';
import {getAll, postMessage} from '../../actions/post.actions'


const AjoutPost = () => {


   const [message, setMessage] = useState({
      content:"",
      attachment:""
   })

   const dispatch = useDispatch()

   const handlePost = e => {
		if (e.target.name !== "attachment") {
			setMessage({ ...message, [e.target.name]: e.target.value });
		} else {
			setMessage({ ...message, attachment: e.target.files[0] });
		}
	};

   const cleanMessage = () =>{
      setMessage({
         content:"",
         attachment:""
      })
   }

   const clearform = () =>
   {
    document.getElementById("FormControlTextarea").value="";
    document.getElementById("attachment").value=""; 
   }

	const handleSubmit =  async (e) => {
      e.preventDefault()
		const formData = new FormData();
		formData.append("content", message.content);
      
      if(message.attachment === ""){
         formData.append("attachment", null);
      }else formData.append("attachment", message.attachment, message.attachment.name);

      await dispatch(postMessage(formData))
      clearform()
      cleanMessage()
      dispatch(getAll())

	};


  
   return (
      <div>
         <form onSubmit={handleSubmit}
                  className="mt-4"
                  method="POST"
                  encType="multipart/form-data"
         >
            <div className="form-group">
               <textarea 
                  name="content" 
                  className="textarea form-control" 
                  id="FormControlTextarea" 
                  value={message.content} rows="3" 
                  placeholder="Quoi de neuf aujourd'hui ?" 
                  onChange={e => handlePost(e)}>
               </textarea>
            </div>

            <div className="formulaire">
               <div className="form-group">
               <label className="label-file" htmlFor="attachment"></label>
               <input
                  type="file"
                  name="attachment"
                  id="attachment"
                  className="form-control-file border"
                  onChange={e => handlePost(e)}
               />
               </div>
               <Bouton>Publier</Bouton>
            </div>

         </form>
      </div>
   );
};

export default AjoutPost;