import React, { Fragment, useRef, useState } from 'react'
import { pencil } from '../../images/index'
import PopupMenu from '../Modal/PopupMenu/PopupMenu'
import PopupMenuItem from '../Modal/PopupMenu/PopupMenuItem'
import PopperOverlay from '../Modal/PopperOverlay'

export default function CustomFilter(props) {
  const [hover, setHover] = useState(false)
  const [popup, setPopup] = useState(false)
  const [clickPos, setClickPos] = useState({x: 0, y: 0})
  
  const buttonRef = useRef()

  function showPopup(event) {
    event.stopPropagation()
    event.preventDefault()

    if (event.type === 'click') {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      
      setClickPos({x: event.clientX, y: event.clientY})
    }
    else {
      setClickPos({x: event.clientX, y: event.clientY})
    }

    setPopup(true)
  }

  return (
    <Fragment>
      <li className={props.selected ? "sidebar-custom-filter selected" : "sidebar-custom-filter"} onClick={props.selectFilter}
          onContextMenu={(event) => showPopup(event)} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} > 
        <div className="left-side">
          <div className="icon">
            <div className="color" style={{backgroundColor: props.color}}></div>
          </div>
          <span>{props.title}</span>
        </div>
        <div className="right-side">
          {(hover || popup) ? 
            <button onClick={(event) => showPopup(event)} ref={buttonRef}>
              <img alt="edit filter" src={pencil}/>
            </button>
            : props.taskCount ? <small>{props.taskCount}</small> : null
          }
        </div>
      </li>
      {popup ? 
        <PopperOverlay closePopper={() => setPopup(false)}>
          <PopupMenu clickPos={clickPos} placement="bottom">
            <PopupMenuItem icon={pencil} alt="" title="Изменить фильтр"/>
            <PopupMenuItem icon={pencil} alt="" title="Добавить в избранное" separator={true}/>
            <PopupMenuItem icon={pencil} alt="" title="Удалить фильтр"/>
          </PopupMenu>
        </PopperOverlay>
        : null
      }
    </Fragment>
  )
}
