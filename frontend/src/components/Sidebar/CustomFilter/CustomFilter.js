import React, { Fragment, useRef, useState } from 'react'
import { pencil } from '../../../images/index'
import { ReactComponent as FilterIcon } from '../../../images/icons/filter.svg'
import PopupMenu from '../../Modal/PopupMenu/PopupMenu'
import PopperOverlay from '../../Modal/PopperOverlay'
import ModalOverlay from '../../Modal/ModalOverlay'
import Edit from './ContextMenu/Edit'
import Delete from './ContextMenu/Delete'
import ToFavorites from './ContextMenu/ToFavorites'
import { AnimatePresence } from 'framer-motion'

export default function CustomFilter(props) {
  const [hover, setHover] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [clickPos, setClickPos] = useState({x: 0, y: 0})
  const [popupPlacement, setPopupPlacement] = useState('')
  const [modalContent, setModalContent] = useState(null)

  const optionsButtonRef = useRef()

  function calculatePopupPos(popupRect) {
    if (popupPlacement === 'center') {
      const buttonRect = optionsButtonRef.current.getBoundingClientRect()
      return {x: (buttonRect.left + buttonRect.right - popupRect.width) / 2, y: buttonRect.bottom}
    }
    else {
      return clickPos
    }
  }

  function showPopup(event) {
    event.stopPropagation()
    event.preventDefault()

    if (event.type === 'click') {
      setPopupPlacement('center')
    }
    else {
      setPopupPlacement('bottom')
      setClickPos({x: event.clientX, y: event.clientY})
    }

    setPopupVisible(true)
  }

  function showModal(modal) {
    setPopupVisible(false)
    setModalContent(modal)
  }

  function closePopup() {
    setModalContent(null)
    setPopupVisible(false)
  }

  return (
    <Fragment>
      <li className={props.selected ? "sidebar-custom-filter selected" : "sidebar-custom-filter"} onClick={props.selectFilter}
          onContextMenu={(event) => showPopup(event)} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}> 
        <div className="left-side">
          <div className="icon">
            <FilterIcon style={{fill: props.color}} className="filter-icon"></FilterIcon>
          </div>
          <span>{props.title}</span>
        </div>
        <div className="right-side">
          {(hover || popupVisible) ? 
            <button onClick={(event) => showPopup(event)} ref={optionsButtonRef}>
              <img alt="edit filter" src={pencil}/>
            </button>
            : props.taskCount ? <small>{props.taskCount}</small> : null
          }
        </div>
      </li>
      {popupVisible ?
        <PopperOverlay closePopper={closePopup}>
          <PopupMenu calculatePos={calculatePopupPos}>
            <Edit filterId={props.id} closePopup={closePopup} showModal={showModal}/>
            <ToFavorites filterId={props.id} inFavorites={props.inFavorites} separator={true} closePopup={closePopup}/>
            <Delete filterId={props.id} title={props.title} showModal={showModal} closePopup={closePopup}/>
          </PopupMenu>
        </PopperOverlay>
        : null
      }
      <AnimatePresence>
        {modalContent ? 
          <ModalOverlay closeModal={closePopup}>
            {modalContent}
          </ModalOverlay>
        : null}
      </AnimatePresence>
    </Fragment>
  ) 
}
