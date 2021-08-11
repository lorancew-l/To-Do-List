import { TokenProvider } from "./account"

const baseURL = 'http://localhost:8000/api/'
const tokenProvider = new TokenProvider()

export async function addTask(data) {
  const token = await tokenProvider.getToken()
  const response =  await fetch(`${baseURL}tasks/`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return response
}

export async function getTaskList(taskFilterId) {
  const token = await tokenProvider.getToken()

  const response = await fetch(`${baseURL}tasks/?task-filter=${taskFilterId}`, {headers: {'Content-Type': 'application/json',
                                                                                          'Authorization': 'Bearer ' + token}})
  return response
}

export async function updateTask(taskId, taskData) {
  const token = await tokenProvider.getToken()
  const response = await fetch(`${baseURL}tasks/${taskId}/`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(taskData)
  })

  return response
}

export async function getSubtaskList(taskId) {
  const token = await tokenProvider.getToken()
  const response = await fetch(`${baseURL}tasks/${taskId}/subtasks/`, {headers: {'Content-Type': 'application/json',
                                                                                 'Authorization': 'Bearer ' + token}})

  return response
}

export async function addSubtask(taskId, subtaskData) {
  const token = await tokenProvider.getToken()
  const response = await fetch(`${baseURL}tasks/${taskId}/subtasks/`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(subtaskData)
  })

  return response
}

export async function updateSubtask(taskId, subtaskId, subtaskData) {
  const token = await tokenProvider.getToken()
  const response = await fetch(`${baseURL}tasks/${taskId}/subtasks/${subtaskId}/`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(subtaskData)
  })
  
  return response
}

export async function deleteSubtask(taskId, subtaskId) {
  const token = await tokenProvider.getToken()
  const response = await fetch(`${baseURL}tasks/${taskId}/subtasks/${subtaskId}/`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })

  return response
}

export async function getTaskFilterList() {
  const token = await tokenProvider.getToken()

  const response =  await fetch(`${baseURL}task-filters/`, {headers: {'Content-Type': 'application/json',
                                                                       'Authorization': 'Bearer ' + token}})
  return response
}

export async function addTaskFilter(data) {
  const token = await tokenProvider.getToken()

  const response =  await fetch(`${baseURL}task-filters/`, {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    body: JSON.stringify(data),
  })
  return response
}