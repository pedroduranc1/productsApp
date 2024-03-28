import axios from "axios";
import { ENV } from "../../presentation/constants";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/async-storage";

export const API_URL = (ENV.STAGE === "production")
    ? ENV.API_URL
    : Platform.OS === "ios"
        ? ENV.API_URL_IOS
        : ENV.API_URL_ANDROID

const tesloApi = axios.create({
    baseURL:API_URL,
    headers:{
        'Content-Type':'application/json'
    }
})

tesloApi.interceptors.request.use(
    async (config) => {

        const token = await StorageAdapter.getItem("token")

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config;
    }
)

export {
    tesloApi
}