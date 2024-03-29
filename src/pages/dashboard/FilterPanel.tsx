import { ChangeEvent, useEffect, useState } from 'react'
import SearchInput from '../../components/SearchInput';
import SelectableList from '../../components/SelectableList';
import { IPhantomFilterValues } from '../../phantoms';

function FilterPanel(props: {categories: Set<string>, value: IPhantomFilterValues, onFilterChange: (filters: IPhantomFilterValues) => void}) {
  const [searchValue, setSearchValue] = useState<string>(props.value.search || '');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(props.value.category);

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
  }, [searchValue, categoryFilter, props.onFilterChange]);

  return (
    <div className="min-w-32">
      <SearchInput name='Phantom Search' placeholder='Search' value={searchValue} onChange={handleSearch} />
      <SelectableList label='Categories' options={props.categories} value={categoryFilter} onChange={(option) => { handleCategoryFiltering(option); }} />
    </div>
  )
}

export default FilterPanel
