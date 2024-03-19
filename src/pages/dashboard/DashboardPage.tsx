import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import PhantomList from './PhantomList';
import { IPhantom, IPhantomActions, IPhantomFilterValues } from '../../phantoms';
import useLocalStorage from '../../hooks/useLocalStorage';
import { deletePhantom, duplicatePhantom, fetchPhantoms, renamePhantom } from '../../phantoms.actions';
import { extractPhantomsCategories, filterPhantoms } from '../../phantoms.filters';
import Loader from '../../components/Loader';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
const FilterPanel = lazy(() => import('./FilterPanel'));
//NOTE: in order to test component lazy loading we can use following import
// const FilterPanel = lazy(() => delayForDemo(import('./FilterPanel')));

function DashboardPage() {
  const [phantoms, setPhantoms] = useLocalStorage<IPhantom[]>('phantoms', []);
  const [phantomsLoading, setPhantomsLoading] = useState<boolean>(false);
  const [displayedPhantoms, setDisplayedPhantoms] = useState<IPhantom[]>([]);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<IPhantomFilterValues>({ search: '', category: null });

  // memoized variables to avoid weird behaviours due to the way Javascript compare objects (by references instead of contents)
  const phantomsDependency: string = useMemo(() => phantoms.map((phantom) => phantom.id).join(','), [phantoms]);

  const navigate = useNavigate()

  async function getPhantoms(controller?: AbortController): Promise<void> {
    if(phantoms.length === 0) {
      // Nothing retrieved from locaStorage
      setPhantomsLoading(true);
      try {
        const phantoms: IPhantom[] = await fetchPhantoms(controller);
        setPhantoms(phantoms);
      } catch (error) {
        //TODO: add a way to display an error message on the UI.
        console.error(`Could not get phantoms: ${error}`);
      } finally {
        setPhantomsLoading(false);
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

  const handleFilterChange = (newFilters: IPhantomFilterValues): void => {
    setFilters(newFilters);
  }

  const resetCache = (): void => {
    localStorage.removeItem('phantoms');
    //Naive approach to reload phantoms fetching logic, there's probably a better way
    navigate(0);
  }

  const phantomActions: IPhantomActions = {
    rename: handleRename,
    duplicate: handleDuplication,
    delete: handleDelete,
  };

  useEffect(() => {
    const controller = new AbortController();
    getPhantoms(controller);

    // cleanup function to avoid a fetch request to continue 
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.info('updating categories');
    setCategories(extractPhantomsCategories(phantoms));
    console.info('updating filtering');
    setDisplayedPhantoms(filterPhantoms(phantoms, filters));
  }, [phantomsDependency, filters.search, filters.category]);

  //TODO: add a button to reset the localStorage cache
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <button onClick={resetCache}>
          <ArrowPathIcon className="h-4 w-4 text-slate-500" />
        </button>
      </div>
      <div className="flex flex-row gap-12">
        <div className="min-w-32">
          <Suspense fallback={<Loader />}>
            <FilterPanel categories={categories} onFilterChange={handleFilterChange} />
          </Suspense>
        </div>
        <div className="grow">
          {phantomsLoading ? <Loader /> : <PhantomList items={displayedPhantoms} actions={phantomActions} />}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

//NOTE: in order to test component lazy loading we can use following delay method
/* function delayForDemo(promise: Promise<typeof import('./FilterPanel')>) {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
} */