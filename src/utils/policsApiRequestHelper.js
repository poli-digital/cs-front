import { handleUrl } from "./utilsHelper";
import axios from 'axios'

function getInstancePolicsApi() {

    const url = handleUrl(process.env.REACT_APP_URL_BACKEND);
    const token = localStorage.getItem('jwt');

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (token !== null) headers = { ...headers, token }

    return axios.create({
        baseURL: url,
        headers: headers
    });

}

function getInstancePiperunApi(token) {
    if (token) {
        try {

            const url = handleUrl(process.env.REACT_APP_URL_PIPERUN);

            let headers = {
                'Content-Type': 'application/json'
            }

            if (token !== null) headers = { ...headers, token }

            return axios.create({
                baseURL: url,
                headers: headers
            });

        } catch (error) {
            console.log('Erro ao obter Instancia do piperun');
        }
    }
}

function getInstancePolichatApi(token) {

    try {

        const url = handleUrl(process.env.REACT_APP_URL_POLICHAT);

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }

        if (token !== null) headers = { ...headers, Authorization: `Bearer ${token}` }

        return axios.create({
            baseURL: url,
            headers: headers
        });

    } catch (error) {
        console.log('Erro ao obter Instancia do polichat');
    }
}

async function getInstancePiperunApi2() {

    let token = await getTokenPipeRun();
    if (token) {
        try {

            const url = handleUrl(process.env.REACT_APP_URL_PIPERUN);

            let headers = {
                'Content-Type': 'application/json'
            }

            if (token !== null) headers = { ...headers, token }

            return axios.create({
                baseURL: url,
                headers: headers
            });

        } catch (error) {
            console.log('Erro ao obter Instancia do piperun');
        }
    }
}

async function getInstancePolichatApi2() {

    let token = await getTokenPolichat();

    try {

        const url = handleUrl(process.env.REACT_APP_URL_POLICHAT);

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }

        if (token !== null) headers = { ...headers, Authorization: `Bearer ${token}` }

        return axios.create({
            baseURL: url,
            headers: headers
        });

    } catch (error) {
        console.log('Erro ao obter Instancia do polichat');
    }
}

async function getConfigPiperun() {
    try {
        const userLocalJson = localStorage.getItem('user');
        if (!userLocalJson) return;
        const user = JSON.parse(userLocalJson);
        const plugin = await getInstancePolicsApi().get(`plugins/Piperun`);
        const idPlugin = plugin.data.id;
        const idCompany = user.company_id;
        const configPluginPipe = await getInstancePolicsApi().get(`configPlugins/company/${idCompany}/plugin/${idPlugin}`);
        return configPluginPipe.data;
    } catch (error) {
        console.log('Erro ao buscar configuração do piperun');
    }
}

async function getConfigPolichat() {
    try {
        const userLocalJson = localStorage.getItem('user');
        if (!userLocalJson) return;
        const user = JSON.parse(userLocalJson);
        const plugin = await getInstancePolicsApi().get(`plugins/Polichat`);
        const idPlugin = plugin.data.id;
        const idCompany = user.company_id;
        const configPluginPolichat = await getInstancePolicsApi().get(`configPlugins/company/${idCompany}/plugin/${idPlugin}`);
        return configPluginPolichat.data;
    } catch (error) {
        console.log('Erro ao buscar configuração do polichat');
    }
}

async function getTokenPipeRun() {
    const config = await getConfigPiperun();
    console.log(config);
    return config?.token;
}

async function getTokenPolichat() {
    const config = await getConfigPolichat();
    return config?.token;
}

async function getToken(params) {

}

export default getInstancePolicsApi;

export { getInstancePiperunApi, getInstancePolichatApi, getConfigPiperun, getConfigPolichat }