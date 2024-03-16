import { useEffect, useState } from 'react'
import PhantomList from './PhantomList';
import { IPhantom } from '../phantom';

function DashboardPage() {
  const [phantoms, setPhantoms] = useState<IPhantom[]>([])

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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <div className="flex flex-row mt-8">
        <div className="min-w-32">Search & Filters</div>
        <div className="grow">
          <PhantomList items={phantoms} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
