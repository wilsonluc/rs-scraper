import React, {useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect (() => {
    fetch("/getItems").then(
      // Json data
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>

      {(typeof backendData.items === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.items.map((item, i) => (
          <p key={i}>ID: {item.id}, Price low: {item.low}, Price high: {item.high}</p>
        ))
      )}
      
    </div>
  )
}

export default App