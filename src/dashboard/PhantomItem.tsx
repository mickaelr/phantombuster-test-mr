import { ClockIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { IPhantom } from '../phantom'
import RemainingTime from './RemainingTime'
import DropdownMenu, { DropdownMenuItem } from '../common/DropdownMenu';

function PhantomItem(props: IPhantom) {

  const renamePhantom = () => {
    console.log(`rename Phantom ${props.id}`);
  };
  const duplicatePhantom = () => {
    console.log(`duplicate Phantom ${props.id}`);
  };
  const deletePhantom = () => {
    console.log(`delete Phantom ${props.id}`);
  };
  const phantomMenuItems: DropdownMenuItem[] = [
    { text: 'Rename', action: renamePhantom },
    { text: 'Duplicate', action: duplicatePhantom },
    { text: 'Delete', action: deletePhantom },
  ];

  return (
    <div className="bg-slate-50 mb-4 p-6 rounded-xl shadow-lg shadow-neutral-400/10 text-slate-500">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-slate-900">{ props.name }</h2>
        <DropdownMenu items={phantomMenuItems}>
          <EllipsisHorizontalIcon className="h-6 w-6 text-slate-500" />
        </DropdownMenu>
      </div>
      <div>{ props.repeatedLaunchTimes?.simplePreset }</div>
      <ClockIcon className="h-6 w-6 text-slate-500" />
      <RemainingTime minutesRemaining={ props.nextLaunchIn } />
    </div>
  )
}
  
export default PhantomItem