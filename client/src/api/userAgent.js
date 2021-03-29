import * as axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:5000/api/'
});

export const usersAPI = {
    registration (email,password) {
        return instance.post(`auth/registration`,{email,password}).then(response => response.data)
    },
    login(email,password){
        return instance.post(`auth/login`,{email,password}).then(response => response.data)
    },
    auth(){
        return instance.get(`auth/auth`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then(response => response.data)
    }
}


