import axios from 'axios'
import {takeTokenInLocalStorage} from '../services/AuthApi'

export const GET_POSTS = "GET_POSTS"
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";


export const getAll = (size) => {
   return (dispatch) =>{
      return axios
      .get(`http://localhost:8080/api/messages?size=${size}`,{
         headers: {
             'authorization': "Bearer " + takeTokenInLocalStorage() ,
             'Accept' : 'application/json',
             'Content-Type': 'application/json'
         }})
      .then((res) =>{
         dispatch({ type: GET_POSTS, payload: res.data})
      }).catch((err) => console.log(err))
   }
}

export const postMessage = (formData) => {
   return (dispatch) => {
     return axios
       .post(`http://localhost:8080/api/messages`, formData, {
         headers: {
            'authorization': "Bearer " + takeTokenInLocalStorage() ,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
       }}).then((res) =>{
         dispatch({ type: ADD_POST, payload: res.data})
      }).catch((err) => console.log(err))
   }
};

export const deletePost = (id) => {
   return (dispatch) =>{
      return axios
      .delete(`http://localhost:8080/api/messages/${id}`, {
         headers: {
             'authorization': "Bearer " + takeTokenInLocalStorage() ,
             'Accept' : 'application/json',
             'Content-Type': 'application/json'
         }
      }).then((res) =>{
         dispatch({ type: DELETE_POST, payload: res.data})
      }).catch((err) => console.log(err))
   }
}

