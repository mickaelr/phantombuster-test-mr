import { useEffect, useState } from 'react'
import { IPhantom } from './phantom';
import PhantomList from './PhantomList';

function App() {
  const [phantoms, setPhantoms] = useState<IPhantom[]>([]) //TODO: remove any

  //TODO: check if the App component is the right place to perform this fetch (probably not)
  async function fetchPhantoms() {
    //TODO: check localStorage before fetching from API

    try {
      const response: Response = await fetch("phantoms.json")
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data: IPhantom[] = await response.json()
      setPhantoms(data)
    } catch (error) {
      //TODO: add a way to display an error message on the UI.
      console.error(`Could not get phantoms: ${error}`)
    }
  }

  useEffect(() => {
    fetchPhantoms()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <PhantomList items={phantoms} />
    </>
  )
}

export default App
