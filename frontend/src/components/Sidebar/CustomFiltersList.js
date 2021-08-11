import React, { useState } from 'react'
import { quickTask, arrowRight } from '../../images/index'
import { AnimatePresence, motion } from 'framer-motion'
import AddTaskFilterForm from '../Modal/AddTaskFilter/AddTaskFilterForm'
import ModalOverlay from '../Modal/ModalOverlay'
import CustomFilter from './CustomFilter'
import { modalAnimation, filterListAnimation } from '../../animations/animations'

export default function CustomFiltersList(props) {
  const [collapse, setСollapsed] = useState(false)
  const [showPopup, setPopup] = useState(false)
 
  return (
    <li>
      <div className="sidebar-expandable-item">
        <div className="left-side">
          <button className="collapse" onClick={() => setСollapsed(!collapse)}>
            <img alt="collapse button" src={arrowRight} className={collapse? "collapsed" : ""}/>
          </button>
          <div>Ваши фильтры</div>
        </div>
        <button className="add" onClick={() => setPopup(true)}>
          <img alt="add filter button" src={quickTask}/>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {collapse? (
          <motion.ul className="custom-filters" animate={collapse && 'animate'} {...filterListAnimation}>
            {
              props.customFilters.map(filter => {
                return <CustomFilter key={filter.id} selected={filter.id === props.selectedFilter} color={filter.color} 
                                     title={filter.title} count={props.count} taskCount={filter.count}
                                     selectFilter={() => props.selectFilter(filter.id)}/>
              })
            }
          </motion.ul>)
          : null}
      </AnimatePresence>
      <AnimatePresence>
        {showPopup && 
          <ModalOverlay closeModal={() => setPopup(false)} {...modalAnimation}>
            <AddTaskFilterForm close={() => setPopup(false)} updateFilterList={props.updateFilterList}/>
          </ModalOverlay>
        }
      </AnimatePresence>
    </li>
  )
}