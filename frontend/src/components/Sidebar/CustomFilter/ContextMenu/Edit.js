import React from 'react'
import AddTaskFilterForm from '../../../Modal/AddTaskFilter/AddTaskFilterForm'
import { updateTaskFilter } from '../../../../tools/api/rest/taskFilters'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { pencil } from '../../../../images/index'

export default function Edit(props) {
  function upateFilter(event, title, color, checked) {
    event.preventDefault()
    updateTaskFilter(props.filterId, {title, color, favorite: checked}).then(response => {
      if (response.ok) {
        props.updateFilterList()
        props.closePopup()
      }
    })
  }

  const modal = (
    <AddTaskFilterForm heading="Изменить фильтр" onSubmit={upateFilter} title={props.title} submitButtonTitle="Сохранить"
                       color={props.color} checked={props.checked} close={props.closePopup}/>
  )

  return (
    <PopupMenuItem icon={pencil} alt="" title="Изменить фильтр" onClick={() => props.showModal(modal)}/>
  )
}
