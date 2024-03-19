import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'react';

type SearchInputProps = {
    name: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

function SearchInput(props: SearchInputProps) {
  return (
    <div className='relative mb-4'>
        <MagnifyingGlassIcon className="icon-sm absolute left-4 -translate-y-1/2 top-1/2" />
        <input 
            className="
                input
                hover:ring-highlight/20 
                focus:border-highlight 
                focus:ring-highlight/20" 
            placeholder={props.placeholder}
            type='text'
            name={props.name} 
            onChange={props.onChange}
        />
    </div>
  )
}
  
export default SearchInput