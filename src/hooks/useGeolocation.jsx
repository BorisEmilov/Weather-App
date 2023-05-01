import React, { useState } from 'react'

const UseGeolocation = () => {
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [status, setStatus] = useState(null)

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not suported on this browser')
    } else {
      setStatus('locating...')
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null)
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      },
        () => {
          setStatus('unable to retrive position')
        }
      )
    }
  }

  console.log(lat)
  

  return (
    <div>
      
    </div>
  )
}

export default UseGeolocation