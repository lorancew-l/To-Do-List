import React from 'react'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { deleteIcon } from '../../../../images/index'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'

export default function Delete(props) {
  const taskStore = useTaskContext()

  function deleteFilter() {
    taskStore.deleteFilter(props.filterId)
      .catch(error => console.log('Delete ', error))
  }

  return (
    <PopupMenuItem icon={deleteIcon} alt="" title="Удалить фильтр" onClick={deleteFilter}/>
  )
}
