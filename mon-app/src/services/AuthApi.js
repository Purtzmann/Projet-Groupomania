import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getItem, addItem, removeItem} from './LocaleStorage'

export function hasAuthenticated(){
   const token = getItem('Token')
   const result = token ? tokenIsValid(token) : false;

   if(false === result){
      removeItem('Token')
   }

   return result;
}

export function login(credentials){
   return axios
      .post('http://localhost:8080/api/users/login', credentials)
      .then(response => response.data)
      .then(token => {
         addItem('Token', token.token);
         addItem('id', token.userId)
         return true
      })
}

export function signup(credentials){
   return axios
      .post('http://localhost:8080/api/users/signup', credentials)
      .then(response => response.data.token)
     
      .then(token => {
         addItem('Token', token);
         return true
      })
}

export function logout(){
   removeItem('Token')
   //removeItem('id')
}

export function tokenIsValid(token){
   const { exp } = jwtDecode(token)

   if( exp * 1000 > new Date().getTime()){
      return true;
   } return false;
}

export function takeTokenInLocalStorage(){
   return localStorage.getItem("Token")
}