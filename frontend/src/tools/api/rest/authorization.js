import makeRequest from "../makeRequest"

const baseURL = 'http://localhost:8000/account/'

export async function signupRequest(email, password) {
  return makeRequest({
    url: `${baseURL}signup/`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    data: {email, password}
  })
}

export async function login(email, password, callback) {
  const response = await makeRequest({
    url: `${baseURL}token/`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    data: {email, password}
  })

  if (response.ok) {
    const tokenData = await response.json()

    localStorage.setItem('accessToken', JSON.stringify(tokenData.access))
    localStorage.setItem('refreshToken', JSON.stringify(tokenData.refresh))

    callback()
  }
}

export async function logout(callback) {
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

  const response = await makeRequest({
    url: `${baseURL}logout/`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    data: {'refresh_token': refreshToken}
  })

  if (response.ok) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    callback()
  }
}