import base64 from "base-64";
import { refreshFetch } from './RefreshFetch';

export default class Data {
  constructor() {
    this.api = 'http://188.150.174.111:8080';
  }


  getToken(username, password) {
    let formdata = new FormData();
    let headers = new Headers();

    formdata.append('grant_type', 'password');
    formdata.append('username', username);
    formdata.append('password', password);

    headers.append('Authorization', 'Basic ' + base64.encode('client' + ":" + 'password'));
    return fetch(this.api + '/oauth/token', {
      method: 'POST',
      headers: headers,
      body: formdata
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(() => {
        throw new Error(response.status);
      })
    })
  }

  getUser(eMail) {
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return refreshFetch(this.api + '/users/' + eMail, {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json())
  }

  addKey(key) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/steamKeys/add", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(key)
    }).then((response) => response.json());;
  }

  addKeys(keys) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/steamKeys/addAll", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(keys)
    }).then((response) => response.json());;
  }

  addUser(user) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/users/add", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user)
    }).then((response) => response.json());
  }

  search(game, platforms, regions, status, startDate, endDate) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);

    return refreshFetch(this.api + "/steamKeys/search", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        game: game,
        platforms: platforms,
        regions: regions,
        status: status,
        startDate: startDate,
        endDate: endDate
      })
    }).then((response) => response.json());
  }

  addPlatform(platform) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/platforms/add", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(
        {
          name: platform
        }
      )
    }).then((response) => response.json());;
  }

  getPlatforms() {
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return refreshFetch(this.api + '/platforms', {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json())
  }

  getAllUsers() {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/users", {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json());;
  }

  removeUser(eMail) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", `application/json`);
    return refreshFetch(this.api + "/users/" + eMail, {
      method: "DELETE",
      headers: headers,
    }).then((response) => response.json());
  }
  /* Fetches all web application activity. */
  getActivity() {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return fetch(this.api + "/logs", {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json());
  }

  addGame(game) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/games/add", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(
        {
          name: game
        }
      )
    }).then((response) => response.json());;
  }

  getGames() {
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return refreshFetch(this.api + '/games', {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json())
  }

  addRegion(region) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/regions/add", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(
        {
          name: region
        }
      )
    }).then((response) => response.json());;
  }

  registerKey(id) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/steamKeys/register/" + id, {
      method: 'POST',
      headers: headers,
      body: localStorage.getItem('user')
    })
  }
  getRegions() {
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return refreshFetch(this.api + '/regions', {
      method: 'GET',
      headers: headers,
    }).then((response) => response.json())
  }

  forgotPassword(eMail) {
    return fetch(this.api + '/users/forgot/' + eMail, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(() => {
        throw new Error(response.status);
      })
    })
  }
  /* Deletes the selected keys. */
  deleteKeys(keys) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", `application/json`);
    return refreshFetch(this.api + "/steamKeys/deleteSelected", {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(keys)
    }).then((response) => response.json());
  }
  /* Updates user information. */
  editUser(user) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/users/edit", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user)
    });
  }

  commentKey(id, comment) {
    const token = JSON.parse(localStorage.getItem("token")).access_token;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', `application/json`);
    return refreshFetch(this.api + "/steamKeys/comment/" + id + "/" + comment, {
      method: 'POST',
      headers: headers,
    }).then((response) => response.json());
  }

}
