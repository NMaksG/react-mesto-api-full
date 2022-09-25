class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._getResult);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(this._getResult)
  } 

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getResult);
  }

  
  setAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._getResult);
  } 

  addCards(data) {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._getResult);
  } 

  delCard(card) {
    return fetch(`${this._url}/cards/${card._id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResult);
  } 

  setLikeCard(card, isLike) {
    return fetch(`${this._url}/cards/${card._id}/likes`, {
      credentials: 'include',
      method: isLike ? 'DELETE' : 'PUT',
      headers: this._headers,
    })
    .then(this._getResult);
  } 
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  baseUrl: 'http://localhost:4000',
  headers: {
    // authorization: '2da19b5e-259f-4a92-b11d-fa94b554e063',
    'Content-Type': 'application/json'
  }
})

export default api;