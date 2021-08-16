import { isToday } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'
import { getTaskList } from '../../tools/api/rest/tasks'
import { deleteTaskFilter, getTaskFilterList, updateTaskFilter } from '../../tools/api/rest/taskFilters'
import { addTask, updateTask } from '../../tools/api/rest/tasks'
import { addTaskFilter } from '../../tools/api/rest/taskFilters'

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
    getTaskList()
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
    getTaskFilterList()
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

  addNewTask(taskData) {
    if (this.currentFilter.type === 'custom' && this.currentFilter.id){
      taskData['task_filter'] = this.currentFilter.id
    }

    return new Promise((resolve, reject) => {
      addTask(taskData)
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

  updateTaskItem(taskId, taskData) {
    return new Promise((resolve, reject) => {
      updateTask(taskId, taskData)
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
  
  addFilter(filterData) {
    return new Promise((resolve, reject) => {
      addTaskFilter(filterData)
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
      deleteTaskFilter(filterId)
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
      updateTaskFilter(filterId, filterData)
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