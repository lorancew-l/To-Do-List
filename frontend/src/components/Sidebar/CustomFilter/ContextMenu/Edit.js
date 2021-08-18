import React from 'react'
import AddTaskFilterForm from '../../../Modal/AddTaskFilter/AddTaskFilterForm'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { pencil } from '../../../../images/index'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'

export default function Edit(props) {
  const taskStore = useTaskContext()

  function upateFilter(event, title, color, checked) {
    event.preventDefault()
    taskStore.updateFilter(props.filterId, {title, color, favorite: checked})
      .then(() => props.closePopup())
      .catch((error) => console.log('Edit', error))
  }

  const modal = (
    <AddTaskFilterForm heading="Изменить фильтр" onSubmit={upateFilter} title={props.title}
                       submitButtonTitle="Сохранить" cancelButtonTitle="Отменить"
                       color={props.color} checked={props.inFavorites} close={props.closePopup}/>
  )

  return (
    <PopupMenuItem icon={pencil} alt="" title="Изменить фильтр" onClick={() => props.showModal(modal)}/>
  )
}