import { create } from "zustand";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/async-storage";

export const useAuthStore = create((set,get)=>({
    status:'checking',
    token:undefined,
    user:undefined,

    login: async (email,password)=>{

        const resp = await authLogin(email,password);

        if(!resp){
            set({status:"unauthenticated",token:undefined,user:undefined})
            return false;
        }

        await StorageAdapter.setItem("token",resp.token)

        set({status:"authenticated",token:resp.token,user:resp.user})

        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();

        if(!resp){
            set({status:"unauthenticated",token:undefined,user:undefined})
            return;
        }

        await StorageAdapter.setItem("token",resp.token)

        set({status:"authenticated",token:resp.token,user:resp.user})
    },

    logout: async () => {
        await StorageAdapter.removeItem('token')
        set({status:"unauthenticated",token:undefined,user:undefined})
    }
}))