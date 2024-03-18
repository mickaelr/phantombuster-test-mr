import { ChangeEvent, useId, useState } from "react";

type SelectableListProps = {
    label: string;
    options: string[];
    onChange: (value: string) => void;
  }

function SelectableList(props: SelectableListProps) {
  const id = useId();
  const emptyValue = '';
  const [selectedOption, setSelectedOption] = useState<string>(emptyValue);

  const onOptionClicked = (option: string) => {
    if(selectedOption !== option) {
      setSelectedOption(option);
      props.onChange(option);
    } else {
      setSelectedOption(emptyValue);
      props.onChange(emptyValue);
    }
  }

  return (
    <div className='mb-4'>
      <div className='py-2 text-xs text-slate-500'>{props.label}</div>
      <ul>
        { props.options.map((option, index) => {
          const capitalizedValue = option.charAt(0).toUpperCase() + option.slice(1);
          const itemKey: string = `${id}_${index}`;
          return (
            <li 
              value={option} 
              key={itemKey} 
              onClick={() => onOptionClicked(option)} 
              className={(option === selectedOption ? 'font-bold bg-blue-800 text-slate-50' : '') + ' px-3 py-1 mt-2 rounded-md cursor-pointer'}
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