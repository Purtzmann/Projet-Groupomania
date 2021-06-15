import {useState} from 'react';

const LogiqueModale = () => {

   const [revele, changeRevele] = useState(false)

   function toggle(){
      changeRevele(!revele)
   }

   return {
      revele,
      toggle
   }
};

export default LogiqueModale;