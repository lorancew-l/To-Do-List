import { useState } from 'react'

export default function useInput(initialValue, {maxLength=100, clearValue=initialValue} = {}) {
  const [value, setValue] = useState(initialValue)
  const [empty, setEmpty] = useState(initialValue? false : true)

  return {value,
          empty,
          maxLength,
          isUnchanged: () => value === initialValue,
          clear: () => setValue(clearValue),
          set: (value) => setValue(value),
          bind: {onChange: event => setValue(event.target.value),
                 onFocus: () => setEmpty(false),
                 onBlur: event => {if (!event.target.value) setEmpty(true)}
                }
         }
}
