import React, { useState } from 'react'
import { clipboard, closeIconInactive, closeIconActive } from '../../../images/index'


export default function Heading(props) {
  const [closeIcon, setCloseIcon] = useState(closeIconActive)
  const creationDate = new Date(props.creationDate).toLocaleDateString('ru-Ru')

  return (
    <div className="heading">
      <div className="left-side">
        <img className="noselect nodrag" alt="section" src={clipboard}/>
        <div className="creation-date">Создано {creationDate}</div>
      </div>
      <button onClick={props.onClose} onMouseEnter={() => setCloseIcon(closeIconActive)}
              onMouseLeave={() => setCloseIcon(closeIconInactive)}>
        <img className="noselect nodrag icon" alt="close" src={closeIcon}/>
      </button >
    </div>
  )
}