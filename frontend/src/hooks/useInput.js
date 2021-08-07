import { useState } from 'react'

export default function useInput(initialValue, maxLength=100) {
  const [value, setValue] = useState(initialValue)
  const [requiredEmpty, setRequiredEmpty] = useState(false)

  return {value,
          requiredEmpty,
          maxLength,
          clear: () => setValue(''),
          set: (value) => setValue(value),
          bind: {onChange: event => setValue(event.target.value),
                 onFocus: () => setRequiredEmpty(false),
                 onBlur: event => {if (!event.target.value) setRequiredEmpty(true)}
                }
         }
}
