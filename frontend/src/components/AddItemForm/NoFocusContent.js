import React from 'react'
import { motion } from 'framer-motion'


export default function NoFocusContent(props) {
  return (
    <motion.li layout className={props.className} onClick={props.onClick} {...props.animation}>
      <div className="left-side">
        <button> 
          <img alt={props.iconAlt} src={props.icon}/>
        </button>
        <div>
          {props.text}
        </div>
      </div>
    </motion.li>
  )
}
