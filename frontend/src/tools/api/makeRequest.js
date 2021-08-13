import { TokenProvider } from './tokenProvider'

const tokenProvider = new TokenProvider()

export default async function makeRequest({url='/', method='GET', headers={}, data={}, mode='cors'}) {
  if (headers?.authorization) {
    const token = await tokenProvider.getToken()

    headers.authorization = 'Bearer ' + token 
  }

  const requestData = {method, headers, mode}

  if (requestData.method.toLowerCase() !== 'get') {
    requestData.body = JSON.stringify(data)
  }

  return await fetch(url, requestData)
}