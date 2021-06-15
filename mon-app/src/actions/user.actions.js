import axios from 'axios'
import {takeTokenInLocalStorage} from '../services/AuthApi'


export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"



export const getUser = (id) => {


   return (dispatch) =>{
      return axios
      .get(`http://localhost:8080/api/users/${id}`, {
         headers: {
             'authorization': "Bearer " + takeTokenInLocalStorage() ,
             'Accept' : 'application/json',
             'Content-Type': 'application/json'
         }
      }).then((res) =>{
         dispatch({ type: GET_USER, payload: res.data})
      }).catch((err) => console.log(err))
   }
}


export const updateUser = (formData) => {
   return (dispatch) =>{
      return axios
      .put(`http://localhost:8080/api/users`,formData, {
         headers: {
             'authorization': "Bearer " + takeTokenInLocalStorage() ,
             'Accept' : 'application/json',
             'Content-Type': 'application/json'
         }
      }).then((res) =>{
         dispatch({ type: UPDATE_USER, playload: res.data})
      }).catch((err) => console.log(err))
   }
}

export const deleteUser = (id) => {
   return (dispatch) =>{
      return axios
      .delete(`http://localhost:8080/api/users/${id}`, {
         headers: {
             'authorization': "Bearer " + takeTokenInLocalStorage() ,
             'Accept' : 'application/json',
             'Content-Type': 'application/json'
         }
      }).then((res) =>{
         dispatch({ type: DELETE_USER, playload: res.data})
      }).catch((err) => console.log(err))
   }
}
