export async function addTask(data) {
  const response = await fetch('http://localhost:8000/api/tasks/', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })

  return response
}

export async function getTaskList() {
  const response = await fetch('http://localhost:8000/api/tasks/')

  return response
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(taskData)
  })

  return response
}

export async function getSubtaskList(taskId) {
  const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/subtasks/`)

  return response
}

export async function addSubtask(taskId, subtaskData) {
  const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/subtasks/`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(subtaskData)
  })

  return response
}

export async function updateSubtask(taskId, subtaskId, subtaskData) {
  const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/subtasks/${subtaskId}/`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(subtaskData)
  })

  return response
}

export async function deleteSubtask(taskId, subtaskId) {
  const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/subtasks/${subtaskId}/`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })

  return response
}