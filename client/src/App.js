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
          //https://stackoverflow.com/questions/51184136/display-an-image-from-url-in-reactjs

          // What I want to display:
          // Image, Name, ?ID, Item instabuy/sell, Trade volume, ROI, Potential Profit, Member item?, Tax? 
          <p key={i}>Name: {item.name}, ID: {item.id}, Price low: {item.low}, Price high: {item.high}, High Alch: {item.highAlch}, Buy Limit: {item.limit}, Member Item: {item.isMember}</p>
        ))
      )}
      
    </div>
  )
}

export default App