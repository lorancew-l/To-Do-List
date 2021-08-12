import { useState } from 'react'

export default function useInput(initialValue, {maxLength=100, clearValue=initialValue} = {}) {
  const [value, setValue] = useState(initialValue)
  const [requiredEmpty, setRequiredEmpty] = useState(initialValue? false : true)

  return {value,
          requiredEmpty,
          maxLength,
          isUnchanged: () => value === initialValue,
          clear: () => setValue(clearValue),
          set: (value) => setValue(value),
          bind: {onChange: event => setValue(event.target.value),
                 onFocus: () => setRequiredEmpty(false),
                 onBlur: event => {if (!event.target.value) setRequiredEmpty(true)}
                }
         }
}
