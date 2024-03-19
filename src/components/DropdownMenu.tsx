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
        <ul className='dropdown-menu-container'>
          { props.items.map((menuItem, index) => {
            const itemKey: string = `${props.refId}_${index}`;
            return (<li key={itemKey}><button onClick={menuItem.action} className='dropdown-menu-item'>{menuItem.text}</button></li>)
          }
          )}
        </ul>
      ) : null}
    </div>
  )
}
  
export default DropdownMenu