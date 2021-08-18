import React from 'react'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { importantTaskInactive } from '../../../../images/index'

export default function ToFavorites(props) {
  const taskStore = useTaskContext()

  function toFavorites() {
    taskStore.updateFilter(props.filterId, {favorite: !props.inFavorites})
      .then(() => props.closePopup())
  }

  return (
    <PopupMenuItem icon={importantTaskInactive} alt="" title={props.inFavorites ? "Удалить из избранных" : "В избранное" }
                   onClick={toFavorites} separator={props.separator}/>
  )
}
