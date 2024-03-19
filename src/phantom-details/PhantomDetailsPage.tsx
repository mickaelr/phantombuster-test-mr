import { useParams } from 'react-router-dom';
import { IPhantom } from '../phantoms';
import { useEffect, useState } from 'react';
import { fetchPhantoms } from '../phantoms.actions';
import useLocalStorage from '../hooks/useLocalStorage';
import { filterById } from '../phantoms.filters';
import PhantomItem from '../dashboard/PhantomItem';

function PhantomDetailsPage() {
  const {phantomId} = useParams();
  const [phantoms, setPhantoms] = useLocalStorage<IPhantom[]>('phantoms', []);
  const [phantom, setPhantom] = useState<IPhantom>();

  async function getPhantom(phantomId: string): Promise<void> {
    if(phantoms.length > 0) {
      findPhantomById(phantoms, phantomId);
    } else {
      // Nothing retrieved from locaStorage
      try {
        const allPhantoms: IPhantom[] = await fetchPhantoms();
        setPhantoms(allPhantoms);
        findPhantomById(allPhantoms, phantomId);
      } catch (error) {
        //TODO: add a way to display an error message on the UI.
        console.error(`Could not get phantoms: ${error}`);
      }
    }
  }

  const findPhantomById = (phantoms: IPhantom[], phantomId: string) => {
    const filteredPhantoms: IPhantom[] = filterById(phantoms, phantomId);
    if(filteredPhantoms.length === 0) {
      throw new Error(`No content for phantom ${phantomId}`);
    } else {
      setPhantom(filteredPhantoms[0]);
    }
  }

  //TODO: check if we should add a cleanup function here
  useEffect(() => {
    if(phantomId) {
      getPhantom(phantomId);
    } else {
      //TODO: add a way to display an error message on the UI.
      console.error(`Could not display this page for null phantomId`);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Phantom</h1>
      {phantom ? (
          <PhantomItem { ...phantom } />
        ) : null}
    </div>
  )
}
  
export default PhantomDetailsPage