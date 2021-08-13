import React, { useLayoutEffect, useRef, useState } from 'react'

export default function PopupMenu(props) {
  const [popupPos, setPopupPos] = useState({x: 0, y: 0})
  const menuRef = useRef()
  const calculatePos = props.calculatePos

  useLayoutEffect(() => {
    const menuRect = menuRef.current.getBoundingClientRect()
    setPopupPos(calculatePos(menuRect))
  }, [calculatePos])

  return (
    <ul className="popup-menu" style={{transform: `translate(${popupPos.x}px, ${popupPos.y}px)`}} ref={menuRef}>
      {props.children}
    </ul>
  )
}
