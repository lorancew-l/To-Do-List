export default function asyncUpdateAction(requestFunction, requestData, updateFunction) {
  return new Promise((resolve, reject) => {
    requestFunction(...requestData)
    .then(response => {
      if (response.ok) {
        if (response.status === 204) {
          return {} 
        } 
        return response.json()
      }
      else {
        throw new Error(response.status)
      }
    })
    .then(responseData => {
      updateFunction(responseData)
      resolve(responseData)
    })
    .catch(error => reject(error))
  })
}