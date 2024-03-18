import { useEffect } from 'react'
import PhantomList from './PhantomList';
import { IPhantom } from '../phantom';
import useLocalStorage from '../hooks/useLocalStorage';

function DashboardPage() {
  const [phantoms, setPhantoms] = useLocalStorage<IPhantom[]>('phantoms', []);

  async function fetchPhantoms() {
    if(phantoms.length === 0) {
      console.log(`Nothing retrieved in useLocalStorage`);
      try {
        //NOTE: we could also use a service like https://mocki.io/fake-json-api to be closer to the real version (ie using the network).
        const response: Response = await fetch("phantoms.json");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data: IPhantom[] = await response.json();
        setPhantoms(data);
      } catch (error) {
        //TODO: add a way to display an error message on the UI.
        console.error(`Could not get phantoms: ${error}`);
      }
    }
  }

  //TODO: check if we should add a cleanup function here
  useEffect(() => {
    fetchPhantoms();
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
