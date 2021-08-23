import useInput from '../../../hooks/useInput'
import { useState } from 'react'
import Heading from '../DialogBox/Heading'
import Controls from '../DialogBox/Controls'

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
    event.preventDefault()
    props.onSubmit(title.value, color.value, checked)
    title.clear()
  }

  return (
    <div className="dialog filter">
      <Heading title={props.heading}/>
      <form onSubmit={handleSubmit}> 
        <div className="dialog-body form-fields">
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
        <Controls submitDisabled={isSubmitDisabled()} cancel={props.close}
                  submitButtonTitle={props.submitButtonTitle} cancelButtonTitle={props.cancelButtonTitle}/>

      </form>
    </div>
  )
}
