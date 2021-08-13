import useInput from '../../../hooks/useInput'
import { useState } from 'react'

export default function AddTaskFilterForm(props) {
  const title = useInput(props.title ?? '', 30)
  const color = useInput(props.color ?? '#5865f2')
  const [checked, setChecked] = useState(props.checked ?? false)

  function isSubmitDisabled() {
    if (!title.value) {
      return true
    }

    if (title.isUnchanged() && color.isUnchanged() && checked === props.checked) {
      return true
    }

    return false
  }

  function handleSubmit(event) {
    props.onSubmit(event, title.value, color.value, checked)
    title.clear()
  }

  return (
    <div className="add-filter">
      <div className="heading"><h1>{props.heading}</h1></div>
      <form onSubmit={handleSubmit}> 
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="filter-title">Название фильтра</label>
            <input type="text" id="filter-title" value={title.value} {...title.bind}/>
          </div>
          <div className="form-field inline">
            <label htmlFor="filter-color-input">
              Цвет фильтра
              <div className="filter-color-input" style={{backgroundColor: color.value}}>
                <input id="filter-color-input" type="color" value={color.value} {...color.bind}/>
              </div>
            </label>
          </div>
          <div className="form-field inline">
            <label htmlFor="filter-favorite">
              <div>Добавить в избранное</div>
              <div className={checked ? "switch on" : "switch off"}>
                <div className={checked ? "checkbox on" : "checkbox off"}/>
                <input id="filter-favorite" type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
              </div>
            </label>
          </div>
        </div>
        <div className="controls">
          <button type="submit" disabled={isSubmitDisabled()} className={isSubmitDisabled() ? "disabled" : ""}>{props.submitButtonTitle}</button>
          <button type="button" className="cancel" onClick={props.close}>Отменить</button>
        </div>
      </form>
    </div>
  )
}
