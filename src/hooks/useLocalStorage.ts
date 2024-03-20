import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLocalStorage<T>(storageKey: string, fallbackState: T): [T, Dispatch<SetStateAction<T>>] {
    const localStringData: string | null = localStorage.getItem(storageKey);
    const localJsonData: T = localStringData ? JSON.parse(localStringData) : null;
    //NOTE: we assume that the data retrieved from localStorage match the expected type T
    // (in our example, that means that localJsonData is an Array of IPhantom objects)
    // in order to avoid unexpected errors we could use TypeGuard to check the locally stored data structure
    // (this could also be useful to detect schema upgrades)
    /*
    function isPhantom(obj: Object): obj is IPhantom {
      const hasId: boolean = ('id' in obj) && (typeof obj.id === 'string');
      const hasName: boolean = ('name' in obj) && (typeof obj.name === 'string');
      const hasScript: boolean = ('script' in obj) && (typeof obj.script === 'string');
      const hasManifest: boolean = ('manifest' in obj) && (typeof obj.manifest === 'object');
      const hasLaunchType: boolean = ('script' in obj) && (typeof obj.script === 'string');
      return hasId && hasName && hasScript && hasManifest && hasLaunchType;
    }
    */
    const [value, setValue] = useState(
      localJsonData ?? fallbackState
    );
  
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [storageKey, value]);
  
    return [value, setValue];
  }