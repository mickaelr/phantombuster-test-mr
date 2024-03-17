import { ReactNode, useState } from 'react';

export type DropdownMenuItem = {
  text: string;
  action: () => any; //TODO: remove any type
};

function DropdownMenu(props: { items: DropdownMenuItem[], children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='relative'>
      <button onClick={toggleMenu}>{props.children}</button>
      {menuOpen ? (
        <ul className='absolute top-full right-0 bg-slate-50 p-1 rounded-xl shadow-lg shadow-neutral-400/10 text-slate-900'>
          { props.items.map((menuItem, index) => (
            <li><button key={index} onClick={menuItem.action} className='w-full p-2 rounded-lg text-left whitespace-nowrap hover:bg-neutral-200'>{menuItem.text}</button></li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
  
export default DropdownMenu