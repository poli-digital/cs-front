import getInstancePolicsApi from './policsApiRequestHelper';

async function getCompanies() {

    let companies = [];
    try {

        const response = await getInstancePolicsApi().get('companies');
        if (!response) return companies;

        const data = response.data;
        if (data instanceof Array) {
            return data;
        }

        return companies;

    } catch (error) {
        return companies;
    }
}

async function getPlugins() {

    let plugins = [];
    try {

        const response = await getInstancePolicsApi().get('plugins');
        if (!response) return plugins;

        const data = response.data;
        if (data instanceof Array) {
            return data;
        }

        return plugins;

    } catch (error) {
        return plugins;
    }
}

async function getConfigPlugins() {

    let configPlugins = [];

    try {

        const response = await getInstancePolicsApi().get('configPlugins');
        if (!response) return configPlugins;

        const data = response.data;
        if (data instanceof Array) {
            return data;
        }

        return configPlugins;

    } catch (error) {
        return configPlugins;
    }
}

export { getCompanies, getPlugins, getConfigPlugins }