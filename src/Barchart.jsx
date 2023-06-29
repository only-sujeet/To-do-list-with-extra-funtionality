import React from 'react'
import { Bar } from 'react-chartjs-2'
  
const Barchart = ({ charData }) => {




  return (
    <div>
      <h1>Barchart</h1>
      <Bar data={charData  } />

    </div>
  )
}

export default Barchart
