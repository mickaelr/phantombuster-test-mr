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
        <MagnifyingGlassIcon className="h-4 w-4 absolute left-4 -translate-y-1/2 top-1/2 text-slate-500" />
        <input 
            className="
                pl-10 
                py-3 
                pr-4 
                rounded-lg 
                w-full
                border
                border-slate-300
                placeholder:italic
                hover:ring 
                hover:ring-highlight/20 
                focus:ring
                focus:border-highlight 
                focus:ring-highlight/20 
                active:border-0 
                active:ring-0
                focus-visible:outline-none" 
            placeholder={props.placeholder}
            type='text'
            name={props.name} 
            onChange={props.onChange}
        />
    </div>
  )
}
  
export default SearchInput