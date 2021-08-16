import { isToday } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'
import { addTaskRequest, getTaskListRequest, updateTaskRequest } from '../../tools/api/rest/tasks'
import { deleteTaskFilterRequest, getTaskFilterListRequest, updateTaskFilterRequest, addTaskFilterRequest } from '../../tools/api/rest/taskFilters'
import { addSubtaskRequest, updateSubtaskRequest, deleteSubtaskRequest } from '../../tools/api/rest/subtasks'

export default class TaskStore {
  tasks = []
  filters = []
  currentFilter = {type: null, id: null}
  tasksLoaded = false
  filtersLoaded = false

  constructor() {
    makeAutoObservable(this)
  }

  fetchTasks() {
    getTaskListRequest()
    .then(response => {
      if (response.ok) {
        return  response.json()
      }
    })
    .then(tasks => {
      this.tasks = tasks
      this.tasksLoaded = true
    })
  }

  fetchFilters() {
    getTaskFilterListRequest()
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(filters => {
      this.filters = filters

      if (!this.currentFilter.type) {
        this.currentFilter = {type: 'today', id: null}
        this.filtersLoaded = true
      }
    })
  }

  load() {
    this.fetchTasks()
    this.fetchFilters()
  }
  
  getTaskById(id) {
    return this.tasks.find(task => task.id === id)
  }

  addNewTask(taskData) {
    if (this.currentFilter.type === 'custom' && this.currentFilter.id){
      taskData['task_filter'] = this.currentFilter.id
    }

    return new Promise((resolve, reject) => {
      addTaskRequest(taskData)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new Error(response.status)
        }
      })
      .then(task => {
        runInAction(() => this.tasks.push(task))
        resolve(task)
      })
      .catch(error => reject(error))
    })
  }

  addNewSubtask(taskId, subtaskData) {
    return new Promise((resolve, reject) => {
      addSubtaskRequest(taskId, subtaskData)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new Error(response.status)
        }
      })
      .then(subtask => {
        const task = this.getTaskById(taskId)
        runInAction(() => task.subtask_list.push(subtask))
        resolve(subtask)
      })
      .catch(error => reject(error))
    })
  }

  updateTaskItem(taskId, taskData) {
    return new Promise((resolve, reject) => {
      updateTaskRequest(taskId, taskData)
      .then(response => {
        if (response.ok) {
          const targetTask = this.tasks.find(task => task.id === taskId)
          runInAction(() => Object.assign(targetTask, taskData))
          resolve(taskId)
        }
        else {
          throw new Error(response.status)
        }
      })
      .catch(error => reject(error))
    })
  }

  updateSubtask(taskId, subtaskId, subtaskData) {
    return new Promise((resolve, reject) => {
      updateSubtaskRequest(taskId, subtaskId, subtaskData)
      .then(response => {
        if (response.ok) {
          const targetTask = this.tasks.find(task => task.id === taskId)
          const targetSubtask = targetTask.subtask_list.find(subtask => subtask.id === subtaskId)
          runInAction(() => Object.assign(targetSubtask, subtaskData))
          resolve(subtaskId)
        }
        else {
          throw new Error(response.status)
        }
      })
      .catch(error => reject(error))
    })
  }

  deleteSubtask(taskId, subtaskId) {
    return new Promise((resolve, reject) => {
      deleteSubtaskRequest(taskId, subtaskId)
      .then(response => {
        if (response.ok) {
          const targetTask = this.tasks.find(task => task.id === taskId)
          runInAction(() => targetTask.subtask_list = targetTask.subtask_list.filter(subtask => subtask.id !== subtaskId))
          resolve(subtaskId)
        }
        else {
          throw new Error(response.status)
        }
      })
      .catch(error => reject(error))
    })
  }
  
  addFilter(filterData) {
    return new Promise((resolve, reject) => {
      addTaskFilterRequest(filterData)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new Error(response.status)
        }
      })
      .then(filter => {
        runInAction(() => this.filters.push(filter))
        resolve(filter)
      })
      .catch(error => reject(error))
    })
  }

  deleteFilter(filterId) {
    return new Promise((resolve, reject) => {
      deleteTaskFilterRequest(filterId)
      .then(response => {
        if (response.ok) {
          runInAction(() => {
            this.filters = this.filters.filter(filter => filter.id !== filterId)
            this.tasks = this.tasks.filter(task => task.task_filter !== filterId)

            if (filterId === this.currentFilter.id) {
              this.setCurrentFilter({type: 'all', id: null})
            } 
          })
          resolve(filterId)
        }
        else {
          throw new Error(response.status)
        }
      })
      .catch(error => reject(error))
    })
  }

  updateFilter(filterId, filterData) {
    return new Promise((resolve, reject) => {
      updateTaskFilterRequest(filterId, filterData)
      .then(response => {
        if (response.ok) {
          const targetFilter = this.filters.find(filter => filter.id === filterId)
          runInAction(() => Object.assign(targetFilter, filterData))
          resolve(filterId)
        }
        else {
          throw new Error(response.status)
        }
      })
      .catch(error => reject(error))
    })
  }

  setCurrentFilter({type='custom', id=null}) {
    this.currentFilter = {type, id}
  }

  get initialLoadingComplete() {
    return this.tasksLoaded && this.filtersLoaded
  }

  get uncompletedTasks() {
    return this.tasks.filter(task => !task.completed)
  }

  get todayTasks() {
    return this.uncompletedTasks.filter(task => isToday(new Date(task.deadline)))
  }

  get importantTasks() {
    return this.uncompletedTasks.filter(task => task.is_important)
  }

  get filteredTasks() {
    if (!this.currentFilter.type) {
      return []
    }
    
    switch (this.currentFilter.type) {
      case 'custom':
        return this.uncompletedTasks.filter(task => task.task_filter === this.currentFilter.id)
      case 'all':
        return this.uncompletedTasks
      case 'today':
        return this.todayTasks
      case 'important':
        return this.importantTasks
      default:
        return this.uncompletedTasks
    }
  }

  get customFilters() {
    return this.filters.map(filter => {
      filter = Object.assign({}, filter)
      filter.count = this.tasks.filter(task => task.task_filter === filter.id).length
      return filter
    })
  }
}