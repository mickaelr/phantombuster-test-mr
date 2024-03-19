import { ReactNode, useState } from 'react';

export type DropdownMenuItem = {
  text: string;
  action: () => void;
};

function DropdownMenu(props: { items: DropdownMenuItem[], refId: string, children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='relative'>
      <button onClick={toggleMenu}>{props.children}</button>
      {menuOpen ? (
        <ul className='absolute top-full right-0 bg-slate-50 p-1 rounded-xl shadow-lg shadow-neutral-400/10 text-slate-900'>
          { props.items.map((menuItem, index) => {
            const itemKey: string = `${props.refId}_${index}`;
            return (<li key={itemKey}><button onClick={menuItem.action} className='w-full p-2 rounded-lg text-left whitespace-nowrap hover:bg-neutral-200'>{menuItem.text}</button></li>)
          }
          )}
        </ul>
      ) : null}
    </div>
  )
}
  
export default DropdownMenu