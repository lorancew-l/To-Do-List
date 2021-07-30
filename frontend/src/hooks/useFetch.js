import { useEffect, useState } from 'react'


export default function useFetch(fetchFunction, args=[], skipInitial=false) {
  const [isLoaded, setLoaded] = useState(false)
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)
  
  function fetchData(){
    fetchFunction(...args)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          setLoaded(true)
          throw new Error(response.status)
        }
      })
      .then(data => {
        setResponseData(data)
        setLoaded(true)
      })
      .catch(error => setError(error))
  }
  
  useEffect(() => {
    let isMounted = true

    if (isMounted && !skipInitial) {
      fetchData()
    }

    return () => isMounted = false

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {value: responseData, isLoaded, error, update: fetchData}
}
