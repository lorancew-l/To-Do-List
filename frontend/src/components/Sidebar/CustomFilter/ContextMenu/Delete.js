import React from 'react'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { deleteIcon } from '../../../../images/index'
import { deleteTaskFilter } from '../../../../tools/api/rest/taskFilters'

export default function Delete(props) {
  function deleteFilter() {
    deleteTaskFilter(props.filterId).then(response => {
      if (response.ok) {
        props.updateFilterList()
      }
    })
  }

  return (
    <PopupMenuItem icon={deleteIcon} alt="" title="Удалить фильтр" onClick={deleteFilter}/>
  )
}
