export async function addTask(data) {
  const response = await fetch('http://localhost:8000/api/task-detail/post/', {
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
  const response = await fetch('http://localhost:8000/api/task-list/')

  if (response.ok) {
    return await response.json()
  }
}