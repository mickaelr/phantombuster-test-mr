import { ClockIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { IPhantom, IPhantomActions } from '../phantoms'
import RemainingTime from './RemainingTime'
import DropdownMenu, { DropdownMenuItem } from '../common/DropdownMenu';

function PhantomItem(props: IPhantom & { actions: IPhantomActions }) {

  const phantomMenuItems: DropdownMenuItem[] = [
    { 
      text: 'Rename', 
      action: () => { props.actions.rename(props.id) },
    },
    { 
      text: 'Duplicate', 
      action: () => { props.actions.duplicate(props.id) }, 
    },
    { 
      text: 'Delete', 
      action: () => { props.actions.delete(props.id) }, 
    },
  ];

  return (
    <div className="bg-slate-50 mb-4 p-6 rounded-xl shadow-lg shadow-neutral-400/10 text-slate-500">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-slate-900">{ props.name }</h2>
        <DropdownMenu items={phantomMenuItems} refId={props.id}>
          <EllipsisHorizontalIcon className="h-4 w-4 text-slate-500" />
        </DropdownMenu>
      </div>
      <div>{ props.repeatedLaunchTimes?.simplePreset }</div>
      <ClockIcon className="h-4 w-4 text-slate-500" />
      <RemainingTime minutesRemaining={ props.nextLaunchIn } />
    </div>
  )
}
  
export default PhantomItem