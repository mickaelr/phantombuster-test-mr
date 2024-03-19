import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import PhantomList from './PhantomList';
import { IPhantom, IPhantomActions, IPhantomFilterValues } from '../phantoms';
import useLocalStorage from '../hooks/useLocalStorage';
import SearchInput from '../common/SearchInput';
import { deletePhantom, duplicatePhantom, renamePhantom } from '../phantoms.actions';
import { extractPhantomsCategories, filterPhantoms } from '../phantoms.filters';
import SelectableList from '../common/SelectableList';

function DashboardPage() {
  const [phantoms, setPhantoms] = useLocalStorage<IPhantom[]>('phantoms', []);
  const [displayedPhantoms, setDisplayedPhantoms] = useState<IPhantom[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

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

  const handleRename = (phantomId: string): void => {
    try {
      const updatedPhantoms = renamePhantom(phantoms, phantomId);
      setPhantoms([ ...updatedPhantoms ]);
    } catch (error) {
      console.error(error instanceof Error ? error.message : `An error occured during phantom ${phantomId} renaming`);
    }
  }

  const handleDuplication = (phantomId: string): void => {
    try {
      const updatedPhantoms = duplicatePhantom(phantoms, phantomId);
      setPhantoms([ ...updatedPhantoms ]);
    } catch (error) {
      console.error(error instanceof Error ? error.message : `An error occured during phantom ${phantomId} duplication`);
    }
  }

  const handleDelete = (phantomId: string): void => {
    try {
      const updatedPhantoms = deletePhantom(phantoms, phantomId);
      setPhantoms([ ...updatedPhantoms ]);
    } catch (error) {
      console.error(error instanceof Error ? error.message : `An error occured during phantom ${phantomId} deletion`);
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  }

  const handleCategoryFiltering = (option: string | null): void => {
    setCategoryFilter(option);
  }

  const phantomActions: IPhantomActions = {
    rename: handleRename,
    duplicate: handleDuplication,
    delete: handleDelete,
  };

  //TODO: check if we should add a cleanup function here
  useEffect(() => {
    fetchPhantoms();
  }, []);

  //TODO: check if we should add a cleanup function here
  useEffect(() => {
    console.info('updating categories');
    setCategories(extractPhantomsCategories(phantoms));

    console.info('updating displayedPhantoms');
    const filters: IPhantomFilterValues = {
      search: searchValue, 
      category: categoryFilter
    }
    setDisplayedPhantoms(filterPhantoms(phantoms, filters));
  }, [searchValue, categoryFilter, phantomsDependency]);

  //TODO: add a button to reset the localStorage cache
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <div className="flex flex-row gap-12 mt-8">
        <div className="min-w-32">
          <SearchInput name='Phantom Search' placeholder='Search' onChange={handleSearch} />
          <SelectableList label='Categories' options={categories} onChange={(option) => handleCategoryFiltering(option)} />
        </div>
        <div className="grow">
          <PhantomList items={displayedPhantoms} actions={phantomActions} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
