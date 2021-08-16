import makeRequest from "../makeRequest"

const baseURL = 'http://localhost:8000/api/tasks/'

export function getSubtaskListRequest(taskId) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/`,
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}

export function addSubtaskRequest(taskId, data) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/`,
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}

export function updateSubtaskRequest(taskId, subtaskId, data) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/${subtaskId}/`,
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}

export async function deleteSubtaskRequest(taskId, subtaskId) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/${subtaskId}/`,
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}