import { ChangeEvent, useEffect, useState } from 'react'
import SearchInput from '../../components/SearchInput';
import SelectableList from '../../components/SelectableList';
import { IPhantomFilterValues } from '../../phantoms';

function FilterPanel(props: {categories: Set<string>, onFilterChange: (filters: IPhantomFilterValues) => void}) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  }

  const handleCategoryFiltering = (option: string | null): void => {
    setCategoryFilter(option);
  }

  useEffect(() => {
    const filters: IPhantomFilterValues = {
      search: searchValue, 
      category: categoryFilter
    }
    props.onFilterChange(filters);
  }, [searchValue, categoryFilter]);

  return (
    <div className="min-w-32">
      <SearchInput name='Phantom Search' placeholder='Search' onChange={handleSearch} />
      <SelectableList label='Categories' options={props.categories} onChange={(option) => handleCategoryFiltering(option)} />
    </div>
  )
}

export default FilterPanel
