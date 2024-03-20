import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';

type SearchInputProps = {
    name: string;
    placeholder: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

function SearchInput(props: SearchInputProps) {
  const [value, setValue] = useState<string>(props.value || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange(e);
  }

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
            value={value}
            onChange={handleChange}
        />
    </div>
  )
}
  
export default SearchInput