import React, { useState } from 'react'
import { quickTask, arrowRight } from '../../images/index'
import { AnimatePresence, motion } from 'framer-motion'
import AddTaskFilterForm from '../Modal/AddTaskFilter/AddTaskFilterForm'
import ModalOverlay from '../Modal/ModalOverlay'
import CustomFilter from './CustomFilter/CustomFilter'
import { modalAnimation, filterListAnimation } from '../../animations/animations'
import { useTaskContext } from '../../store/TaskStore/TaskContext'
import { observer } from 'mobx-react'

function CustomFiltersList(props) {
  const [collapse, setСollapsed] = useState(false)
  const [showPopup, setPopup] = useState(false)
  const taskStore = useTaskContext()

  function addFilter(event, title, color, checked) {  
    event.preventDefault()
    
    taskStore.addFilter({title, color, favorite: checked})
      .then(() => setPopup(false))
      .catch(error => console.log('CustomFiltersList: ',error))
  } 
 
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
              taskStore.customFilters.map(filter => {
                return <CustomFilter key={filter.id} id={filter.id} selected={filter.id === taskStore.currentFilter.id} color={filter.color} 
                                     title={filter.title} count={props.count} taskCount={filter.count} checked={filter.favorite}
                                     selectFilter={() => taskStore.setCurrentFilter({type: "custom", id: filter.id})}/>
              })
            }
          </motion.ul>)
          : null}
      </AnimatePresence>
      <AnimatePresence>
        {showPopup && 
          <ModalOverlay closeModal={() => setPopup(false)} {...modalAnimation}>
            <AddTaskFilterForm heading="Добавить фильтр" submitButtonTitle="Добавить" onSubmit={addFilter} close={() => setPopup(false)}/>
          </ModalOverlay>
        }
      </AnimatePresence>
    </li>
  )
}

export default observer(CustomFiltersList)