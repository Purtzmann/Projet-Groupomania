import { GET_POSTS } from "../actions/post.actions";

const initialState = {}

export default function postReducer(state = initialState, action){
   switch(action.type){
      case GET_POSTS:
         console.log(action)
         return action.payload
      
      default:
         return state;

   }
}


// import { GET_POSTS } from "../actions/post.actions";

// const initialState = []


// export default function postReducer(state = initialState, action){
//    switch(action.type){
//       case GET_POSTS:
//          console.log(action)
//          return [
//             ...state,
//             ...action.payload,
//          ];
      
//       default:
//          return state;

//    }

// }

