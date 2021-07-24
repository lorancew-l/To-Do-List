import { getToken } from "./account"

const baseURL = 'http://localhost:8000/api/'

export async function addTask(data) {
  const response =  getToken().then(async (token) => {
    const fetchData = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    }

    return await fetch(`${baseURL}tasks/`, fetchData)
  })
  
  return response
}

export async function getTaskList() {
  const response =  getToken().then(async (token) => {
    const fetchData =  {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + token}}
    
    return await fetch(`${baseURL}tasks/`, fetchData)
  })

  return response
}

export async function updateTask(taskId, taskData) {
  const response =  getToken().then(async (token) => {
    const fetchData = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(taskData)
    }
    return await fetch(`${baseURL}tasks/${taskId}/`, fetchData)
  })

  return response
}

export async function getSubtaskList(taskId) {
  const response =  getToken().then(async (token) => {
    return await fetch(`${baseURL}tasks/${taskId}/subtasks/`, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + token}})
  })

  return response
}

export async function addSubtask(taskId, subtaskData) {
  const response =  getToken().then(async (token) => {
    return await fetch(`${baseURL}tasks/${taskId}/subtasks/`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(subtaskData)
    })
  })


  return response
}

export async function updateSubtask(taskId, subtaskId, subtaskData) {
  const response =  getToken().then(async (token) => {
    return await fetch(`${baseURL}tasks/${taskId}/subtasks/${subtaskId}/`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(subtaskData)
    })
  })
  
  return response
}

export async function deleteSubtask(taskId, subtaskId) {
  const response =  getToken().then(async (token) => {
    return await fetch(`${baseURL}tasks/${taskId}/subtasks/${subtaskId}/`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
  })

  return response
}