import React, { Fragment } from 'react'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { deleteIcon } from '../../../../images/index'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'
import ConfirmDelete from '../../../Modal/Alerts/ConfirmDelete'
import { alertAnimation } from '../../../../animations/animations'

export default function Delete(props) {
  const taskStore = useTaskContext()
  const modal = <ConfirmDelete title="Удалить фильтр" itemName={props.title} animation={alertAnimation}
                               onSubmit={deleteFilter} cancel={props.closePopup}/>

  function deleteFilter() {
    props.closePopup()
    setTimeout(() => {
      taskStore.deleteFilter(props.filterId)
      .catch(error => console.log('Delete ', error))
    }, 300)
  }

  return (
    <Fragment>
      <PopupMenuItem icon={deleteIcon} alt="" title="Удалить фильтр" onClick={() => props.showModal(modal)}/>
    </Fragment>
  )   
}
