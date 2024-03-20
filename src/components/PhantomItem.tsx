import { ClockIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { IPhantom, IPhantomActions } from '../phantoms'
import RemainingTime from './RemainingTime'
import DropdownMenu, { DropdownMenuItem } from './DropdownMenu';
import { Link } from 'react-router-dom';

function PhantomItem(props: IPhantom & { actions?: IPhantomActions }) {

  let phantomMenuItems: DropdownMenuItem[] = [];
  if(props.actions) {
    phantomMenuItems = [
      { 
        text: 'Rename', 
        action: () => { props.actions?.rename(props.id) },
      },
      { 
        text: 'Duplicate', 
        action: () => { props.actions?.duplicate(props.id) }, 
      },
      { 
        text: 'Delete', 
        action: () => { props.actions?.delete(props.id) }, 
      },
    ];
  }

  return (
    <div className="card text-slate-500">
      <div className="flex justify-between">
        <Link to={props.id}>
          <h2 className="h2 mb-3">{ props.name }</h2>
        </Link>
        {(phantomMenuItems.length > 0) ? (
          <DropdownMenu items={phantomMenuItems} refId={props.id}>
            <EllipsisHorizontalIcon className="icon-sm" />
          </DropdownMenu>
        ) : null}
      </div>
      <div className="flex items-center flex-wrap gap-3">
        {props.repeatedLaunchTimes?.simplePreset ? (
          <span>{ props.repeatedLaunchTimes.simplePreset }</span>
        ) : null}
        {(props.repeatedLaunchTimes?.simplePreset && props.nextLaunchIn) ? (
          <span className="border-l-2 h-4 border-slate-300"></span>
        ) : null}
        {props.nextLaunchIn ? (
          <>
            <ClockIcon className="icon-sm" />
            <RemainingTime minutesRemaining={ props.nextLaunchIn } />
          </>
        ) : null}
      </div>
    </div>
  )
}
  
export default PhantomItem