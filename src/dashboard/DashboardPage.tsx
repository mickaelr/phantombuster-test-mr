import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import PhantomList from './PhantomList';
import { IPhantom, IPhantomActions } from '../phantoms';
import useLocalStorage from '../hooks/useLocalStorage';
import SearchInput from '../common/SearchInput';
import { deletePhantom, duplicatePhantom, renamePhantom, searchPhantom } from '../phantoms.actions';

function DashboardPage() {
  const [phantoms, setPhantoms] = useLocalStorage<IPhantom[]>('phantoms', []);
  const [displayedPhantoms, setDisplayedPhantoms] = useState<IPhantom[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  // memoized variables to avoid weird behaviours due to the way Javascript compare objects (by references instead of contents)
  const phantomsDependency: string = useMemo(() => phantoms.map((phantom) => phantom.id).join(','), [phantoms]);

  async function fetchPhantoms() {
    if(phantoms.length === 0) {
      console.info(`Nothing retrieved from useLocalStorage`);
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

  const handlePhantomRename = (phantomId: string): void => {
    try {
      const updatedPhantoms = renamePhantom(phantoms, phantomId);
      setPhantoms([ ...updatedPhantoms ]);
    } catch (error) {
      console.error(error instanceof Error ? error.message : `An error occured during phantom ${phantomId} renaming`);
    }
  }

  const handlePhantomDuplication = (phantomId: string): void => {
    try {
      const updatedPhantoms = duplicatePhantom(phantoms, phantomId);
      setPhantoms([ ...updatedPhantoms ]);
    } catch (error) {
      console.error(error instanceof Error ? error.message : `An error occured during phantom ${phantomId} duplication`);
    }
  }

  const handlePhantomDelete = (phantomId: string): void => {
    try {
      const updatedPhantoms = deletePhantom(phantoms, phantomId);
      setPhantoms([ ...updatedPhantoms ]);
    } catch (error) {
      console.error(error instanceof Error ? error.message : `An error occured during phantom ${phantomId} deletion`);
    }
  }

  const handlePhantomSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    setDisplayedPhantoms(searchPhantom(phantoms, event.target.value));
  }

  const phantomActions: IPhantomActions = {
    rename: handlePhantomRename,
    duplicate: handlePhantomDuplication,
    delete: handlePhantomDelete,
  };

  //TODO: check if we should add a cleanup function here
  useEffect(() => {
    fetchPhantoms();
  }, []);

  //TODO: check if we should add a cleanup function here
  useEffect(() => {
    console.log('updating displayedPhantoms');
    setDisplayedPhantoms(searchPhantom(phantoms, searchValue));
  }, [searchValue, phantomsDependency]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <div className="flex flex-row gap-12 mt-8">
        <div className="min-w-32">
          <SearchInput name='Phantom Search' placeholder='Search' onChange={handlePhantomSearch} />
        </div>
        <div className="grow">
          <PhantomList items={displayedPhantoms} actions={phantomActions} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
