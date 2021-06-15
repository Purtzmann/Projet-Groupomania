import { GET_USER, UPDATE_USER, DELETE_USER } from "../actions/user.actions";

const initialState = {
   id:'',
   lastName:'',
   firstName:'',
   post:'',
   picture:'',
   email:'',
}

export default function userReducer(state = initialState, action){
   switch(action.type){
      case GET_USER:
         return {
            ...state,
            ...action.payload,
       };

      case UPDATE_USER:
         return {
           ...state,
           ...action.payload,
      };

      case DELETE_USER:
         return {
           ...state,
           ...action.payload,
      };
      
      default:
         return state;

   }

}