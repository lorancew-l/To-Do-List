import React from 'react'
import TaskFilterForm from './TaskFilterForm'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'

export default function AddTaskFilter(props) {
  const taskStore = useTaskContext()

  function addFilter(title, color, checked) {  
    taskStore.addFilter({title, color, favorite: checked})
      .then(() => props.onSubmit ? props.onSubmit() : props.close())
      .catch(error => console.log('CustomFiltersList: ',error))
  } 
  
  return (
    <TaskFilterForm heading="Добавить фильтр" submitButtonTitle="Добавить" cancelButtonTitle="Отменить" close={props.close} onSubmit={addFilter}/>
  )
}
