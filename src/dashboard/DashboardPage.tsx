import { useEffect } from 'react'
import PhantomList from './PhantomList';
import { IPhantom, IPhantomActions } from '../phantom';
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

  const renamePhantom = (phantomId: string): void => {
    console.log(`renaming phantom ${phantomId}`);
  }

  const duplicatePhantom = (phantomId: string): void => {
    console.log(`duplicating phantom ${phantomId}`);

    const phantomToDuplicateArray: IPhantom[] = phantoms.filter((item: IPhantom) => (item.id === phantomId));
    if(phantomToDuplicateArray.length === 0) {
      //TODO: add a way to display an error message on the UI.
      console.error(`Cannot duplicate phantoms ${phantomId}: not found`);
    } else if(phantomToDuplicateArray.length === 1) {
      const phantomToDuplicate: IPhantom = phantomToDuplicateArray[0];
      //NOTE: we implemented the most basic way to generate a unique ID, by using current epoch time
      // obviously this can't be used for a production app, but in that case the backend or the DB will be in charge of that.
      const duplicatedPhantom: IPhantom = { ...phantomToDuplicate, id: Date.now().valueOf().toString() }
      setPhantoms([ ...phantoms, duplicatedPhantom ]);
      //TODO: also save in localStorage
    } else {
      //TODO: add a way to display an error message on the UI.
      console.error(`Cannot duplicate phantoms ${phantomId}: more than one phantom found with same ID`);
    }
  }

  const deletePhantom = (phantomId: string): void => {
    console.log(`deleting phantom ${phantomId}`);
  
    const newPhantomList: IPhantom[] = [ ...phantoms ];
    //TODO: handle errors (if zero or several items are found by below filter)
    newPhantomList.filter((item: IPhantom, index: number, array: IPhantom[]) => {
      if (item.id === phantomId) {
        // Removes the value from the original array
        array.splice(index, 1);
        return true;
      }
      return false;
    });
    setPhantoms(newPhantomList);
    //TODO: also save in localStorage
  }

  const phantomActions: IPhantomActions = {
    rename: renamePhantom,
    duplicate: duplicatePhantom,
    delete: deletePhantom,
  };

  //TODO: check if we should add a cleanup function here
  useEffect(() => {
    fetchPhantoms();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <div className="flex flex-row mt-8">
        <div className="min-w-32">Search & Filters</div>
        <div className="grow">
          <PhantomList items={phantoms} actions={phantomActions} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
