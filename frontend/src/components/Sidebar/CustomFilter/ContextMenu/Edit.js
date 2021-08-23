import React from 'react'
import EditTaskFilter from '../../../Modal/TaskFilterForm/EditTaskFilter'
import PopupMenuItem from '../../../Modal/PopupMenu/PopupMenuItem'
import { ReactComponent as PencilIcon } from '../../../../images/icons/pencil.svg'

export default function Edit(props) {
  return (
    <PopupMenuItem icon={<PencilIcon />} alt="" title="Изменить фильтр"
                   onClick={() => props.showModal(<EditTaskFilter filterId={props.filterId} close={props.closePopup}/>)}/>
  )
}