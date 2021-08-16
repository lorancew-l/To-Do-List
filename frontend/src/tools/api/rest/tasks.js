import makeRequest from "../makeRequest"

const baseURL = 'http://localhost:8000/api/tasks/'

export function addTaskRequest(data) {
  return makeRequest({
    url: baseURL,
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}

export function getTaskListRequest() {
  return makeRequest({
    url: `${baseURL}`,
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}

export function updateTaskRequest(taskId, data) {
  return makeRequest({
    url: `${baseURL}${taskId}/`,
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}