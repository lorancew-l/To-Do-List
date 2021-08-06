const baseURL = 'http://localhost:8000/account/'

export async function signup(email, password) {
  const response = await fetch(`${baseURL}signup/`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({email: email, password: password})
  })

  return response
}

export async function login(email, password, callback) {
  const fetchData = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({email: email, password: password})
  }

  await fetch(`${baseURL}token/`, fetchData).then(response => {
    if (response.ok) {
     response.json().then(token => {
       localStorage.setItem('accessToken', JSON.stringify(token.access))
       localStorage.setItem('refreshToken', JSON.stringify(token.refresh))
       callback()
     })
    }
  })
}

export async function logout(callback) {
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

  await fetch(`${baseURL}logout/`, {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({refresh_token: refreshToken})
  }).then(response => {
    if (response.ok) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      callback()
    }
  })
}

export class TokenProvider {
  constructor() {
    if (!TokenProvider._instance) {
      TokenProvider._instance = this
      
      this.token = null
      this.lastRefreshToken = null
    }
    return TokenProvider._instance
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('accessToken'))
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

    if (!token) {
      return null
    }

    if (!isTokenExpired(token)) {
      return token
    }
    else if (!(refreshToken === this.lastRefreshToken)) {
      this.refreshToken(refreshToken)
    }

    return this.token
  }

  refreshToken(refreshToken) {
    this.lastRefreshToken = refreshToken

    this.token = new Promise(async (resolve, reject) => {
      const updatedToken = await fetch (`${baseURL}token/refresh/`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({refresh: refreshToken})
      }).then(response => response.json())
      
      localStorage.setItem('accessToken', JSON.stringify(updatedToken.access))
      localStorage.setItem('refreshToken', JSON.stringify(updatedToken.refresh))

      resolve(updatedToken.access)
    })
  }
}

export function isRefreshTokenExpired() {
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
  
  if (refreshToken === null) {
    return true
  }
  else {
    return isTokenExpired(refreshToken)
  }
}

export function isTokenExpired(token) {
  const expirationDate = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000)
  
  return Date.now() > expirationDate
}