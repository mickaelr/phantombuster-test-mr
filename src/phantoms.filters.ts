import { IPhantom, IPhantomFilterFunction, IPhantomFilterFunctions, IPhantomFilterValues } from "./phantoms";

export const filterById: IPhantomFilterFunction<string> = (phantoms: IPhantom[], id: string): IPhantom[] => {
  return phantoms.filter((item: IPhantom) => (item.id === id));
}

export const extractPhantomsCategories = (phantoms: IPhantom[]): Set<string> => {
  const resultCategories: Set<string> = new Set();
  phantoms.map((phantom: IPhantom) => {
    phantom.manifest.tags.categories.forEach((category: string) => resultCategories.add(category))
  });
  return resultCategories;
};

const filterPhantomsByCategory: IPhantomFilterFunction<string | null> = (phantomList: IPhantom[], category: string | null): IPhantom[] => {
  console.info(`Filtering phantoms with ${category}`);
  if(category) {
    const phantomFilteringResult: IPhantom[] = phantomList.filter((item: IPhantom) => (item.manifest.tags.categories.includes(category)));
    return phantomFilteringResult;
  }
  return phantomList;
};

const searchPhantom: IPhantomFilterFunction<string> = (phantomList: IPhantom[], searchText: string): IPhantom[] => {
  const formattedSearchText = searchText.toLowerCase().trim();
  console.info(`Searching phantoms with ${formattedSearchText}`);
  const phantomSearchResult: IPhantom[] = phantomList.filter((item: IPhantom) => (item.name.toLowerCase().trim().includes(formattedSearchText)));
  return phantomSearchResult;
};

const phantomFiltersMap: IPhantomFilterFunctions = {
  search: searchPhantom,
  category: filterPhantomsByCategory,
}

export const filterPhantoms = (phantomList: IPhantom[], filters: IPhantomFilterValues): IPhantom[] => {
  let filteredResult: IPhantom[] = [ ...phantomList ];
  let filterKey: keyof typeof filters;

  for(filterKey in filters) {
    const filter = phantomFiltersMap[filterKey];
    if(filter) {
      filteredResult = filter(filteredResult, filters[filterKey]);
    }
  }

  return filteredResult
};