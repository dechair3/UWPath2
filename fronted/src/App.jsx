import { useState, useEffect } from 'react'
import backendService from './backendService'
import Program from './components/Program'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    backendService.getOneProgram("ECE")
    .then((resp) => {
      setData(resp)
    })
  }, [])  

  if(data == []){
    return (
      <div>
        <p>Hello world</p>
      </div>
    )
  }
  else{
    console.log(data)
    return (
      <div>
        <Program programObject={data} />
      </div>
    )
  }

}

export default App
