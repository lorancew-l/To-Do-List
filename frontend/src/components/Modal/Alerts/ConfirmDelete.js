import React from 'react'
import Heading from '../DialogBox/Heading'
import AlertMessage from '../DialogBox/AlertMessage'
import Controls from '../DialogBox/Controls'
import { motion } from 'framer-motion'

export default function ConfirmDelete(props) {
  const alertText = <span>Вы уверены, что хотите удалить <b>{props.itemName}</b>?</span>

  function handleSubmit(event) {
    event.preventDefault()
    props.onSubmit()
  }

  return (
    <motion.div className="dialog alert-delete" {...props.animation}>
      <Heading title={props.title}/>
      <form onSubmit={handleSubmit}>
        <AlertMessage text={alertText}/>
        <Controls submitButtonTitle="Удалить" cancelButtonTitle="Отменить" cancel={props.cancel}/>
      </form>
    </motion.div>
  )
}
