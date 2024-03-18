import { IPhantom } from "./phantoms";

export const searchPhantom = (phantomList: IPhantom[], searchText: string): IPhantom[] => {
    const formattedSearchText = searchText.toLowerCase().trim();
    console.info(`Searching phantoms with ${formattedSearchText}`);
    const phantomSearchResult: IPhantom[] = phantomList.filter((item: IPhantom) => (item.name.toLowerCase().trim().includes(formattedSearchText)));
    return phantomSearchResult;
  }

export const renamePhantom = (phantomList: IPhantom[], phantomId: string): IPhantom[] => {
    console.info(`Renaming phantom ${phantomId}`);
    return phantomList;
  }

export const duplicatePhantom = (phantomList: IPhantom[], phantomId: string): IPhantom[] => {
    console.info(`Duplicating phantom ${phantomId}`);

    const phantomToDuplicateArray: IPhantom[] = phantomList.filter((item: IPhantom) => (item.id === phantomId));
    if(phantomToDuplicateArray.length === 0) {
      //TODO: add a way to display an error message on the UI.
      throw new Error(`Cannot duplicate phantoms ${phantomId}: not found`);
    } else if(phantomToDuplicateArray.length === 1) {
      const phantomToDuplicate: IPhantom = phantomToDuplicateArray[0];
      //NOTE: we implemented the most basic way to generate a unique ID, by using current epoch time
      // obviously this can't be used for a production app, but in that case the backend or the DB will be in charge of that.
      const duplicatedPhantom: IPhantom = { ...phantomToDuplicate, id: Date.now().valueOf().toString() }
      return [ ...phantomList, duplicatedPhantom ];
    } else {
      //TODO: add a way to display an error message on the UI.
      throw new Error(`Cannot duplicate phantoms ${phantomId}: more than one phantom found with same ID`);
    }
  }

export const deletePhantom = (phantomList: IPhantom[], phantomId: string): IPhantom[] => {
    console.info(`Deleting phantom ${phantomId}`);
  
    const newPhantomList: IPhantom[] = [ ...phantomList ];
    newPhantomList.filter((item: IPhantom, index: number, array: IPhantom[]) => {
      if (item.id === phantomId) {
        // Removes the value from the original array
        array.splice(index, 1);
        return true;
      }
      return false;
    });
    if(newPhantomList.length === (phantomList.length - 1)) {
      return newPhantomList;
    } else if(newPhantomList.length === phantomList.length) {
      //TODO: add a way to display an error message on the UI.
      throw new Error(`Cannot delete phantoms ${phantomId}: not found`);
    } else {
      //TODO: add a way to display an error message on the UI.
      throw new Error(`Cannot delete phantoms ${phantomId}: more than one phantom found with same ID`);
    }
  }