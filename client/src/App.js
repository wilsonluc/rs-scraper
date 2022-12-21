import React, {useEffect, useState} from 'react'
import './App.css'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

function App() {
  
  const [backendData, setBackendData] = useState([{}])

  useEffect (() => {
    fetch("/getItems").then(
      // Json data
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  var isEmpty = typeof backendData.items === 'undefined'

  if (isEmpty) {
    return (
      <p>Loading...</p>
    )
  }
  else {
    const columns = [{
      dataField: "id",
      text: "id"
    },
    {
      dataField: "name",
      text: "name",
      filter: textFilter()
    }, 
    {
      dataField: "",
      text: "currentPrice",
    }, 
    {
      dataField: "low",
      text: "Approx. Offer Price",
    }, 
    {
      dataField: "high",
      text: "Approx. Sell Price",
    }, 
    {
      dataField: "tax",
      text: "Tax"
    },
    {
      dataField: "approxProfit",
      text: "Approx. Profit (gp)"
    },
    {
      dataField: "roi",
      text: "ROI%",
    }, 
    {
      dataField: "",
      text: "Buying Quantity (per hour)",
    }, 
    {
      dataField: "",
      text: "Selling Quantity (per hour)",
    }, 
    {
      dataField: "",
      text: "Buy/Sell Ratio",
    }, 
    {
      dataField: "limit",
      text: "GE limit"
    }]


    return(
      <BootstrapTable keyField='id' data={ backendData.items } columns={ columns } filter={ filterFactory()}/>
    )    
  }
}

export default App
