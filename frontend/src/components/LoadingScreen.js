import React from 'react'
import { motion } from 'framer-motion'
import { loaderAnimation, loadingScreenAnimation } from '../animations/animations'

export default function LoadingScreen(props) {
  return (
    <motion.div className="loading-screen" {...loadingScreenAnimation}>
      <motion.div className="loader" {...loaderAnimation}></motion.div>
    </motion.div >
  )
}
