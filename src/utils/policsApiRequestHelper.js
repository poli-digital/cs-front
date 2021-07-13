import { handleUrl } from "./utilsHelper";
import axios from 'axios'

const url = handleUrl(process.env.REACT_APP_URL_BACKEND);
const token = localStorage.getItem('jwt');

function getInstancePolicsApi() {

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if(token !== null) headers = {...headers, token}

    return axios.create({
        baseURL: url,
        headers: headers
    });
    
}

export default getInstancePolicsApi;