import { tesloApi } from "../../config/api/tesloApi";

const returnUserToken = (data)=>{

    const user = {
        id:data.id,
        email:data.email,
        fullName: data.fullName,
        isActive:data.isActive,
        roles:data.roles
    }

    return{
        user:user,
        token:data.token,
    }
}

export const authLogin = async (email,password)=>{

    email = email.toLowerCase();

    try {
        const {data} = await tesloApi.post('/auth/login',{
            email,
            password
        })

        return returnUserToken(data);
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        
        const {data} = await tesloApi.get('/auth/check-status')

        return returnUserToken(data)

    } catch (error) {
        console.log(error)
        return null
    }
}