import { ReactNode, createContext, useState} from 'react'


export type AuthType ={
  user?:undefined|string,
  pwd?:undefined|string
  accessToken?:string|undefined

}
export type contextType={
  auth:AuthType|null,
  setAuth:React.Dispatch<React.SetStateAction<AuthType|null>>


}

export const AuthContext=createContext<contextType>(null!)



const AuthProvider = ({children}:{children:ReactNode}) => {
  const [auth,setAuth]=useState<AuthType |null>(null)
  return (
    <AuthContext.Provider value={{auth,setAuth}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider