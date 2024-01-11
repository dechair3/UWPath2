import { useState, useEffect } from 'react'
import backendService from './backendService'
import Program from './components/Program'

const App = () => {
  const [data, setData] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadPrograms = async () => {
      const response = await backendService.getOneProgram("ECE")
      setData(response)
    }

    loadPrograms().then(() => setLoaded(true)).catch(console.error)
  }, [])  

  if(!(loaded)){
    return (
      <div>
        <p>Hello world</p>
      </div>
    )
  }
  else{
    return (
      <div>
        <Program programObject={data} />
      </div>
    )
  }

}

export default App
