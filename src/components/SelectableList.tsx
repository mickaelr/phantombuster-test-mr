import { useId, useState } from "react";

type SelectableListProps = {
    label: string;
    options: Set<string>;
    onChange: (value: string | null) => void;
  }

function SelectableList(props: SelectableListProps) {
  const id = useId();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onOptionClicked = (option: string) => {
    if(selectedOption !== option) {
      setSelectedOption(option);
      props.onChange(option);
    } else {
      setSelectedOption(null);
      props.onChange(null);
    }
  }

  return (
    <div className='mb-4'>
      <div className='py-2 text-xs text-slate-500'>{props.label}</div>
      <ul>
        { Array.from(props.options).map((option, index) => {
          const capitalizedValue = option.charAt(0).toUpperCase() + option.slice(1);
          const itemKey: string = `${id}_${index}`;
          return (
            <li 
              value={option} 
              key={itemKey} 
              onClick={() => onOptionClicked(option)} 
              className={(option === selectedOption ? 'selected font-bold bg-blue-800 text-slate-50' : '') + ' px-3 py-1 mt-2 rounded-md cursor-pointer'}
            >
              {capitalizedValue}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
  
export default SelectableList