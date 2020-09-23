import base64 from "base-64";
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch'

const api = 'http://localhost:8080'

const shouldRefreshToken = error =>
    error.response.status === 401 &&
    error.body.message === 'Token has expired'

const refreshToken = () => {
    let formdata = new FormData();
    let headers = new Headers();

    formdata.append('grant_type', 'refresh_token');
    formdata.append('access_token', JSON.parse(localStorage.getItem('token')).access_token);
    formdata.append('refresh_token', JSON.parse(localStorage.getItem('token')).refresh_token);

    headers.append('Authorization', 'Basic ' + base64.encode('client' + ":" + 'password'));
    return fetch(api + '/oauth/token', {
        method: 'POST',
        headers: headers,
        body: formdata
    })
        .then((response) => response.json())
        .then(responseJson => {
            localStorage.setItem("token", JSON.stringify(responseJson));
        })
        .catch(error => {
            throw error
        })
}

const refreshFetch = configureRefreshFetch({
    fetch: fetch,
    shouldRefreshToken,
    refreshToken
})

export { refreshFetch }
