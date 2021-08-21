import React from 'react'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { ReactComponent as StarIcon } from '../../../../images/icons/star_grey.svg'

export default function ToFavorites(props) {
  const taskStore = useTaskContext()

  function toFavorites() {
    taskStore.updateFilter(props.filterId, {favorite: !props.inFavorites})
      .then(() => props.closePopup())
  }

  return (
    <PopupMenuItem icon={<StarIcon />} alt="" title={props.inFavorites ? "Удалить из избранных" : "В избранное" }
                   onClick={toFavorites} separator={props.separator}/>
  )
}
