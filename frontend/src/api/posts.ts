import axios from 'axios'

const api = axios.create({baseURL:"http://localhost:8000/api"})
export default api




// export const getPosts =async():Promise<PostType[] |undefined>=>{
  
//    try{
//     return (await api.get('/posts',{withCredentials:true})).data
// }catch(error:any){
//     const preReq =error?.config
    
//     if(error.response?.status===403 && !preReq?.sent ){
//         preReq.sent =true
//         const newAcessToken = await api.get("/refresh",{withCredentials:true})
//         preReq.headers["Authorization"]=`Bearer ${newAcessToken}`
//          api(preReq)
//        }

// }

// }