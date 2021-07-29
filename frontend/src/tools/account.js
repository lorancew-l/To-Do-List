const accountURL = 'http://localhost:8000/api/account/'


export async function signup(email, password) {
  const response = await fetch(`${accountURL}signup/`, {
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

  await fetch(`${accountURL}token/`, fetchData).then(response => {
    if (response.ok) {
     response.json().then(token => {
       localStorage.setItem('accessToken', JSON.stringify(token.access))
       localStorage.setItem('refreshToken', JSON.stringify(token.refresh))
       callback()
     })
    }
  })
}

export async function getToken() {
  const token = JSON.parse(localStorage.getItem('accessToken'))

  if (!token) {
    return null
  }

  if (isTokenExpired(token)) {
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
    const updatedToken = await fetch (`${accountURL}token/refresh/`, {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({refresh: refreshToken})
    }).then(response => response.json())
    
    localStorage.setItem('accessToken', JSON.stringify(updatedToken.access))

    return updatedToken.access
  }
  else {
    return token
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