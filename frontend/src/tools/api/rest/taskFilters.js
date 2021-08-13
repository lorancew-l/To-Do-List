import makeRequest from "../makeRequest"

const baseURL = 'http://localhost:8000/api/task-filters/'


export function getTaskFilterList() {
  return makeRequest({
    url: baseURL,
    headers: {'Content-Type': 'application/json', authorization: true},
  })
}