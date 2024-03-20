import { ReactNode, useEffect, useState } from 'react';
import useClickedOutside from '../hooks/useClickedOutside';

export type DropdownMenuItem = {
  text: string;
  action: () => void;
};

function DropdownMenu(props: { items: DropdownMenuItem[], refId: string, children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ref, clickedOutside, setClickedOutside } = useClickedOutside<HTMLDivElement>();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if(clickedOutside) {
      setMenuOpen(false);
      setClickedOutside(false);
    }
  }, [clickedOutside, setClickedOutside]);

  return (
    <div ref={ref} className='relative'>
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