const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const fetchPost = async (url, body, token = null) => {

    try {

        return await fetch(url, {
            method: 'POST',
            headers: token ? {...headers, 'token' : token} : headers,
            body: JSON.stringify(body)
        });

    } catch (err) {
        return null;
    }
}

export const fetchGet = async (url, token = null) => {

    try {

        return await fetch(url, {
            method: 'GET',
            headers: token ? {...headers, 'token' : token} : headers
        });

    } catch (err) {
        return null;
    }
}