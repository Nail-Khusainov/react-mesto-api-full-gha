const { NODE_ENV, REACT_APP_BASE_URL } = process.env;

const BASE_URL = NODE_ENV === 'production' ? REACT_APP_BASE_URL : 'http://localhost:3000';

class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    // Обработчик ответа сервера
    _handleResponse(res) {
      if (!res.ok) {
        return Promise.reject(`ERROR: ${res.status}`);
      }
      return res.json();
    }
  
    // Универсальный метод запроса с проверкой ответа
    _request(url, options) {
      return fetch(url, options)
        .then(this._handleResponse)
    }
  
    getInitialCards() {
      return this._request(`${this._url}/cards`, {
        method: "GET",
        credentials: 'include',
        // headers: this._headers,
      });
    }
  
    getUserInfoFromServer() {
      return this._request(`${this._url}/users/me`, {
        method: "GET",
        credentials: 'include',
        // headers: this._headers,
      });
    }
  
    setNewUserInfo(data) {
      return this._request(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.user_name,
          about: data.user_about,
        }),
      });
    }
  
    setAvatar(data) {
      return this._request(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          avatar: data.user_avatar,
        }),
      });
    }
  
    setCard({ name, link }) {
      return this._request(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name,
          link
        }),
      });
    }
  
    deleteCard(id) {
      return this._request(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
      });
    }
  
    addLike(id) {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: 'include',
      });
    }
  
    deleteLike(id) {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
      });
    }
  
    changeLikeCardStatus(id, isLiked) {
      if (isLiked) {
        return this.addLike(id);
      } else {
        return this.deleteLike(id);
      }
    }
  }
  
  const api = new Api({
    baseUrl: BASE_URL,
    headers: {
      // authorization: '820534b3-b689-4c68-920e-3e0fc31314d3',
      'Content-Type': 'application/json'
    }
  });
  
  export default api;
  