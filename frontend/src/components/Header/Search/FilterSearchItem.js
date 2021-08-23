import React from 'react'
import { ReactComponent as FilterIcon } from '../../../images/icons/filter.svg'

export default function FilterSearchItem(props) {
  return (
    <li className="search-results-item" onMouseDown={event => event.preventDefault()} onClick={props.onClick}>
      <div className="left-side">
        <div className="search-results-item-icon">
          <FilterIcon className="filter-icon" style={{fill: props.filter.color}}/>
        </div>
        <span>{props.filter.title}</span>
      </div>
    </li>
  )
}
