import React from 'react'
import { dailyTasksActive, clipboard, importantTaskActive } from '../../images/index'
import DefaultFilter from './DefaultFilter'
import CustomFiltersList from './CustomFiltersList'


export default function Sidebar(props) {
  const icons = {today: dailyTasksActive, important: importantTaskActive, all: clipboard}
  const defaultFilters = props.taskFilterList.filter(filter => filter.type in icons)
  const customFilters = props.taskFilterList.filter(filter => !(filter.type in icons))

  return (
    <aside className={props.showSidebar? 'sidebar on' : 'sidebar off'}>
      <ul className="sidebar-filters-list">
        <ul className="default-filters">
          {
            defaultFilters.map(item => {
              return <DefaultFilter selected={item.id === props.selectedFilter} taskCount={item.count}
                                    icon={icons[item.type]} key={item.id} title={item.title} selectFilter={() => props.selectFilter(item.id)}/>
            })
          }
        </ul>
        <CustomFiltersList customFilters={customFilters} updateFilterList={props.updateFilterList}
                           selectFilter={props.selectFilter} selectedFilter={props.selectedFilter}/>
      </ul>
    </aside>
  )
}
