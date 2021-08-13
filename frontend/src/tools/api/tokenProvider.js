import makeRequest from "./makeRequest"

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

    this.token = new Promise(async (resolve) => {
      const updatedToken = await makeRequest({
        url: 'http://localhost:8000/account/token/refresh/',
        method: 'POST',
        headers: {'Content-Type': 'application/json', authorization: true},
        data: {refresh: refreshToken}
      }).then(response => response.json())
      
      localStorage.setItem('accessToken', JSON.stringify(updatedToken.access))
      localStorage.setItem('refreshToken', JSON.stringify(updatedToken.refresh))

      resolve(updatedToken.access)
    })
  }
}

export function isTokenExpired(token) {
  const expirationDate = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000)
  
  return Date.now() > expirationDate
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