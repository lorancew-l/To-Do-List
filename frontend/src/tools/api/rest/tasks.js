import makeRequest from "../makeRequest"

const baseURL = 'http://localhost:8000/api/tasks/'

export function addTask(data) {
  return makeRequest({
    url: baseURL,
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}

export function getTaskList(taskFilterId) {
  return makeRequest({
    url: `${baseURL}?task-filter=${taskFilterId}`,
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}

export function updateTask(taskId, data) {
  return makeRequest({
    url: `${baseURL}${taskId}/`,
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}