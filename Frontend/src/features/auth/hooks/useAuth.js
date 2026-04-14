import { useDispatch } from "react-redux";

import { register, login, getMe } from "../services/auth.api";

import { setError, setUser, setLoading } from "../auth.slice";

export function useAuth(){


    const dispatch = useDispatch();


     async function handleRegister({email ,password , username}){
          try{
               dispatch(setLoading(true));
               const data = await register({email , password, username})
               console.log(data);
          }
          catch(error){
           dispatch(setError(error.response?.data?.message || "Registeration falied"))
          }
          finally{
            dispatch(setLoading(false))
          }
    }

    async function handleLogin({email, password}){
        try{
             dispatch(setLoading(true));
            const data = await login({email, password})
            dispatch(setUser(data.user))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "logined falied "))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }
        catch(error){
           dispatch(setError(error.response?.data?.message || "failed to fetch data "))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return {
        handleGetMe,
        handleLogin,
        handleRegister
    }
}

