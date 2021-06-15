import axios from 'axios';
import {takeTokenInLocalStorage} from '../services/AuthApi'

const API_URL = 'http://localhost:8080/api/';

// const getAll = (size) => {
//    return axios.get(`http://localhost:8080/api/messages/getMessages?size=${size}`);
// };


// export const postMessage = formData =>
// 	axios.post("http://localhost:8080/api/messages/new", formData, {
//       headers: {
//          'authorization': "Bearer " + takeTokenInLocalStorage() ,
//          'Accept' : 'application/json',
//          'Content-Type': 'application/json'
//      },
// });

// const deletePost = (id) => {
// 	axios.delete(`http://localhost:8080/api/messages/${id}`, {
// 		headers: {
//          'authorization': "Bearer " + takeTokenInLocalStorage() ,
//          'Accept' : 'application/json',
//          'Content-Type': 'application/json'
// 		},
// });}



const messagesAPI = {
   // getAll,
   // postMessage,
   // deletePost,
}

export default messagesAPI