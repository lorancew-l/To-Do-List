import { isToday } from 'date-fns'
import { makeAutoObservable } from 'mobx'
import { getTaskList } from '../../tools/api/rest/tasks'
import { getTaskFilterList } from '../../tools/api/rest/taskFilters'


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

  addTask(task) {
    this.tasks.push(task)
  }

  taskToImportant(taskId, important) {
    this.tasks.find(task => task.id === taskId).is_important = important
  }

  completeTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId)
  }

  setCurrentFilter({type='custom', id=null}) {
    this.currentFilter = {type, id}
  }

  get initialLoadingComplete() {
    return this.tasksLoaded && this.filtersLoaded
  }

  get todayTasks() {
    return this.tasks.filter((task) => isToday(new Date(task.deadline)))
  }

  get importantTasks() {
    return this.tasks.filter((task) => task.is_important)
  }

  get filteredTasks() {
    if (!this.currentFilter.type) {
      return []
    }
    
    switch (this.currentFilter.type) {
      case 'custom':
        return this.tasks.filter((task) => task.task_filter === this.currentFilter.id)
      case 'all':
        return this.tasks
      case 'today':
        return this.todayTasks
      case 'important':
        return this.importantTasks
      default:
        return this.tasks
    }
  }
}