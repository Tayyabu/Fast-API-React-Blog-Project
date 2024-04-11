import { createStore,action, Action} from "easy-peasy";

export interface Author {
    id:number
     name:string
     title:string
 posts:PostType[]
 }
 export interface PostType{
    id:number
    title:string
    body:string
    authorName:string
    date:string
  }    

export interface StoreModel{
    posts:PostType[],
    setPosts:Action<StoreModel,PostType[]>
    search:string
    setSearch:Action<StoreModel,string>
    searchResults:PostType[]|undefined
    setSearchResults:Action<StoreModel,PostType[]|undefined>
    
    
    }
export default createStore<StoreModel>({
posts:[],
setPosts:action((state,payload)=>{

state.posts =payload
})
,search:""
,setSearch:action((state,payload)=>{
state.search =payload
})
,searchResults:[]
,setSearchResults:action((state,payload)=>{
state.searchResults =payload
})

})

