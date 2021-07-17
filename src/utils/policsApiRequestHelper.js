import { handleUrl } from "./utilsHelper";
import axios from 'axios'

function getInstancePolicsApi() {

    const url = handleUrl(process.env.REACT_APP_URL_BACKEND);
    const token = localStorage.getItem('jwt');

    let headers = {
        'Accept':'application/json',
        'Content-Type':'application/json'
    }

    if(token !== null) headers = {...headers, token}

    return axios.create({
        baseURL: url,
        headers: headers
    });
    
}

function getInstancePiperunApi() {

    const url = handleUrl(process.env.REACT_APP_URL_PIPERUN);
    const token = localStorage.getItem('token_piperun');

    let headers = {
        'Content-Type':'application/json'
    }

    if(token !== null) headers = {...headers, token}

    return axios.create({
        baseURL: url,
        headers: headers
    });
    
}
        
function getInstancePolichatApi() {

    const url = handleUrl(process.env.REACT_APP_URL_POLICHAT);
    const token = localStorage.getItem('token_polichat');

    let headers = {
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept' : 'application/json',
    }

    if(token !== null) headers = {...headers, Authorization:`Bearer ${token}`}

    return axios.create({
        baseURL: url,
        headers: headers
    });
    
}

export default getInstancePolicsApi;

export {getInstancePiperunApi, getInstancePolichatApi}