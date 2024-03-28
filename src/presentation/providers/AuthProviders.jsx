import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from "../store/auth/AuthStore";
import React, { useEffect } from 'react'

export const AuthProvider = ({children}) => {

    const navigation = useNavigation()
    const {checkStatus,status} = useAuthStore()

    useEffect(() => {
      checkStatus()
    }, [])
    

    useEffect(() => {
      if(status !== 'checking'){
        if(status === 'authenticated'){
            navigation.reset({
                index:0,
                routes:[{name:"HomeScreen"}]
            })
        }else{
            navigation.reset({
                index:0,
                routes:[{name:"LoginScreen"}]
            })
        }
      }
    }, [status])
    

  return (
    <>
    {children}
    </>
  )
}