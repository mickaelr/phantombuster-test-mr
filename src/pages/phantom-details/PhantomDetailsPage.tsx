import { Link, useParams } from 'react-router-dom';
import { IPhantom } from '../../phantoms';
import { useEffect, useState } from 'react';
import { fetchPhantoms } from '../../phantoms.actions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { filterById } from '../../phantoms.filters';
import PhantomItem from '../../components/PhantomItem';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

function PhantomDetailsPage() {
  const {phantomId} = useParams();
  const [phantoms, setPhantoms] = useLocalStorage<IPhantom[]>('phantoms', []);
  const [phantom, setPhantom] = useState<IPhantom>();

  async function getPhantom(phantomId: string, controller?: AbortController): Promise<void> {
    if(phantoms.length > 0) {
      findPhantomById(phantoms, phantomId);
    } else {
      // Nothing retrieved from locaStorage
      try {
        const allPhantoms: IPhantom[] = await fetchPhantoms(controller);
        setPhantoms(allPhantoms);
        findPhantomById(allPhantoms, phantomId);
      } catch (error) {
        throw new Error(`Could not get phantom: ${error}`);
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

  useEffect(() => {
    const controller = new AbortController();
    if(phantomId) {
      getPhantom(phantomId, controller);
    } else {
      throw new Error(`Could not display this page for null phantomId`);
    }

    // cleanup function to avoid a fetch request to continue 
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="container mx-auto my-10">
      <Link to='/phantoms'>
        <div className="flex items-center flex-wrap gap-4 text-lg text-blue-800 mb-8">
          <ChevronLeftIcon className="icon-sm" />
          Back to the Dashboard
        </div>
      </Link>
      {phantom ? (
        
          <PhantomItem { ...phantom } />
      ) : null}
    </div>
  )
}
  
export default PhantomDetailsPage