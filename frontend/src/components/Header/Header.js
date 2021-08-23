import React, { useState, Fragment} from 'react'
import { openSideBar, lensIcon, settings } from '../../images/index'
import { useTaskContext } from '../../store/TaskStore/TaskContext'
import Logout from '../Account/Logout'
import ModalOverlay from '../Modal/ModalOverlay'
import { AnimatePresence } from 'framer-motion'
import TaskDetail from '../Modal/TaskDetail/TaskDetail'
import EditTaskFilter from '../Modal/TaskFilterForm/EditTaskFilter'
import SearchResultsList from './Search/SearchResultsList'

export default function Header(props) {
  const taskStore = useTaskContext()

  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchOnFocus, setSearchOnFocus] = useState(false)

  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [selectedFilterId, setSelectedFilterId] = useState(null)

  function search(searchRequest) {
    setSearchInputValue(searchRequest)

    if (searchRequest) {
      setSearchResults(taskStore.search(searchRequest))

      if (!showSearchResults) {
        setShowSearchResults(true)
      }
    }
    else {
      setShowSearchResults(false)
    }
  }

  function closeSearch() {
    setSearchInputValue('')
    setShowSearchResults(false)
    setSearchOnFocus(false)
  }

  function showEditTaskDialog(taskId) {
    closeSearch()
    setSearchOnFocus(false)
    setSelectedTaskId(taskId)
  }

  function showEditFilterDialog(filterId) {
    closeSearch()
    setSearchOnFocus(false)
    setSelectedFilterId(filterId)
  }

  return (
    <Fragment>
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <button onClick={props.onSidebarChange}>
              <img alt="open sidebar" src={openSideBar}/>
            </button>
            <div className={searchOnFocus ? "header-search expanded" : "header-search"}>
              <img alt="search" src={lensIcon}/>
              <input type="text" placeholder="Поиск" value={searchInputValue} onChange={event => search(event.target.value)} maxLength="50" 
                     onBlur={closeSearch} onFocus={() => setSearchOnFocus(true)}/>
              {showSearchResults &&
                <SearchResultsList searchResults={searchResults} showEditTaskDialog={showEditTaskDialog} showEditFilterDialog={showEditFilterDialog}/>
              }
            </div>
          </div>
          <div className="header-right">
            <Logout isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} />
            <button>
              <img alt="settings" src={settings}/>
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {selectedTaskId &&
          <ModalOverlay closeModal={() => setSelectedTaskId(null)}>
            <TaskDetail closeModal={() => setSelectedTaskId(null)} taskId={selectedTaskId}/>
          </ModalOverlay>
        }
        {selectedFilterId &&
          <ModalOverlay closeModal={() => setSelectedFilterId(null)}>
            <EditTaskFilter filterId={selectedFilterId} close={() => setSelectedFilterId(null)}/>
          </ModalOverlay>
        }
      </AnimatePresence>
    </Fragment>
  )
}