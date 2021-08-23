import { isToday } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'
import { addTaskRequest, getTaskListRequest, updateTaskRequest } from '../../tools/api/rest/tasks'
import { deleteTaskFilterRequest, getTaskFilterListRequest, updateTaskFilterRequest, addTaskFilterRequest } from '../../tools/api/rest/taskFilters'
import { addSubtaskRequest, updateSubtaskRequest, deleteSubtaskRequest } from '../../tools/api/rest/subtasks'
import asyncUpdateAction from '../asyncUpdateAction'

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

  addTask(taskData) {
    if (this.currentFilter.type === 'custom' && this.currentFilter.id){
      taskData['task_filter'] = this.currentFilter.id
    }
    
    return asyncUpdateAction(addTaskRequest, [taskData], (task) => {
      runInAction(() => this.tasks.push(task))
    })
  }

  addSubtask(taskId, subtaskData) {
    return asyncUpdateAction(addSubtaskRequest, [taskId, subtaskData], (subtask) => {
      const task = this.getTaskById(taskId)
      runInAction(() => task.subtask_list.push(subtask))
    })
  }

  updateTask(taskId, taskData) {
    return asyncUpdateAction(updateTaskRequest, [taskId, taskData], (updatedTask) => {
      const targetTask = this.tasks.find(task => task.id === taskId)
      runInAction(() => Object.assign(targetTask, updatedTask))
    })
  }

  updateSubtask(taskId, subtaskId, subtaskData) {
    return asyncUpdateAction(updateSubtaskRequest, [taskId, subtaskId, subtaskData], (updatedSubtask) => {
      const targetTask = this.tasks.find(task => task.id === taskId)
      const targetSubtask = targetTask.subtask_list.find(subtask => subtask.id === subtaskId)
      runInAction(() => Object.assign(targetSubtask, updatedSubtask))
    })
  }

  deleteSubtask(taskId, subtaskId) {
    return asyncUpdateAction(deleteSubtaskRequest, [taskId, subtaskId], () => {
      const targetTask = this.tasks.find(task => task.id === taskId)
      runInAction(() => targetTask.subtask_list = targetTask.subtask_list.filter(subtask => subtask.id !== subtaskId))
    })
  }

  getFilterById(id) {
    return this.customFilters.find(filter => filter.id === id)
  }
  
  addFilter(filterData) {
    return asyncUpdateAction(addTaskFilterRequest, [filterData], (filter) => {
      runInAction(() => this.filters.push(filter))
    })
  }

  deleteFilter(filterId) {
    return asyncUpdateAction(deleteTaskFilterRequest, [filterId], () => {
      runInAction(() => {
        this.filters = this.filters.filter(filter => filter.id !== filterId)
        this.tasks = this.tasks.filter(task => task.task_filter !== filterId)

        if (filterId === this.currentFilter.id) {
          this.setCurrentFilter({type: 'all', id: null})
        } 
      })
    })
  }

  updateFilter(filterId, filterData) {
    return asyncUpdateAction(updateTaskFilterRequest, [filterId, filterData], (updatedFilter) => {
      const targetFilter = this.filters.find(filter => filter.id === filterId)
      runInAction(() => Object.assign(targetFilter, updatedFilter))
    })
  }

  setCurrentFilter({type='custom', id=null}) {
    this.currentFilter = {type, id}
  }

  search(searchRequest) {
    const tasks = this.uncompletedTasks.filter(task => task.title.toLowerCase().includes(searchRequest.toLowerCase()))
    const filters = this.filters.filter(filter => filter.title.toLowerCase().includes(searchRequest.toLowerCase()))

    return {tasks, filters}
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