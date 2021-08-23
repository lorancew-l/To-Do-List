import React from 'react'
import TaskFilterForm from './TaskFilterForm'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'

export default function EditTaskFilter(props) {
  const taskStore = useTaskContext()
  const filter = taskStore.getFilterById(props.filterId)

  function upateFilter(title, color, checked) {
    taskStore.updateFilter(props.filterId, {title, color, favorite: checked})
      .then(() => props.onSubmit ? props.onSubmit() : props.close())
      .catch((error) => console.log('Edit', error))
  }

  return (
    <TaskFilterForm heading="Изменить фильтр" submitButtonTitle="Сохранить" cancelButtonTitle="Отменить"
                    title={filter.title} color={filter.color} checked={filter.favorite} close={props.close} onSubmit={upateFilter}/>
  )
}
