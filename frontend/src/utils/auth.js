// const baseUrl = 'https://auth.nomoreparties.co';
const baseUrl = 'http://localhost:4000';

const checkResponse = (response) =>
  response.ok ?
    response.json()
    : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const register = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password
    }),
  })
  .then(res => checkResponse(res));
}

export const authorize = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password
    }),
  })
  .then(res => checkResponse(res));
}

export const getContent = () => {
  return fetch(`${baseUrl}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers,
  })
  .then(res => checkResponse(res));
}

export const logout = () => {
  return fetch(`${baseUrl}/signout`, {
    credentials: 'include',
    method: 'DELETE',
    headers,
  })
  .then(res => checkResponse(res));
}

