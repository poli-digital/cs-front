function handleUrl(url) {
    return url.endsWith('/') ? url : (url + '/');
}

export {handleUrl}