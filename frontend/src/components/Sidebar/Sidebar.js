import React from 'react'
import { dailyTasksActive, clipboard, importantTaskActive } from '../../images/index'
import DefaultFilter from './DefaultFilter'
import CustomFiltersList from './CustomFiltersList'
import { useTaskContext } from '../../store/TaskStore/TaskContext'
import { observer } from 'mobx-react'


function Sidebar(props) {
  const taskStore = useTaskContext()

  return (
    <aside className={props.showSidebar? 'sidebar on' : 'sidebar off'}>
      <ul className="sidebar-filters-list">
        <ul className="default-filters">
          <DefaultFilter selected={taskStore.currentFilter.type === "today"} taskCount={taskStore.todayTasks.length}
                         icon={dailyTasksActive} title={"Сегодня"}
                         selectFilter={() => taskStore.setCurrentFilter({type: "today", id: null})}/>
          <DefaultFilter selected={taskStore.currentFilter.type === "important"} taskCount={taskStore.importantTasks.length}
                         icon={importantTaskActive} title={"Важно"}
                         selectFilter={() => taskStore.setCurrentFilter({type: "important", id: null})}/>
          <DefaultFilter selected={taskStore.currentFilter.type === "all"} taskCount={taskStore.tasks.length}
                         icon={clipboard} title={"Все задачи"}
                         selectFilter={() => taskStore.setCurrentFilter({type: "all", id: null})}/>
        </ul>
        <CustomFiltersList/>
      </ul>
    </aside>
  )
}

export default observer(Sidebar)