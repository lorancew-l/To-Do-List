import makeRequest from "../makeRequest"

const baseURL = 'http://localhost:8000/api/task-filters/'


export function getTaskFilterListRequest() {
  return makeRequest({
    url: baseURL,
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}

export function addTaskFilterRequest(data) {
  return makeRequest({
    url: baseURL,
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}

export function deleteTaskFilterRequest(filterId) {
  return makeRequest({
    url: `${baseURL}${filterId}/`,
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}

export function updateTaskFilterRequest(filterId, data) {
  return makeRequest({
    url: `${baseURL}${filterId}/`,
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}
