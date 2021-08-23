import React from 'react'
import TaskSearchItem from './TaskSearchItem'
import FilterSearchItem from './FilterSearchItem'

export default function SearchResultsList(props) {
  if (!props.searchResults.tasks?.length && !props.searchResults.filters?.length ) {
    return (
      <ul className="search-results">
        <li className="search-results-item">Нет результатов</li>
     </ul>
    )
  }
  return (
    <ul className="search-results">
      {props.searchResults.tasks.map(task => <TaskSearchItem key={task.id} task={task} onClick={() => props.showEditTaskDialog(task.id)}/>)}
      {props.searchResults.filters.map(filter => <FilterSearchItem key={filter.id} filter={filter} onClick={() => props.showEditFilterDialog(filter.id)}/>)}
  </ul>
  )
}
