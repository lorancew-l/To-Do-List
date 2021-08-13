import makeRequest from "../makeRequest"

const baseURL = 'http://localhost:8000/api/tasks/'

export function getSubtaskList(taskId) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/`,
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}

export function addSubtask(taskId, data) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/`,
    method: 'POST',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}

export function updateSubtask(taskId, subtaskId, data) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/${subtaskId}/`,
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', authorization: true},
    data
  })
}

export async function deleteSubtask(taskId, subtaskId) {
  return makeRequest({
    url: `${baseURL}${taskId}/subtasks/${subtaskId}/`,
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}