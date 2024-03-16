import { ClockIcon } from '@heroicons/react/24/outline'
import { IPhantom } from '../phantom'
import RemainingTime from './RemainingTime'

function PhantomItem(props: IPhantom) {
  return (
    <div className="bg-white mb-4 p-6 rounded-xl text-slate-500">
      <h2 className="text-xl font-bold text-slate-900">{ props.name }</h2>
      <div>drop-down menu with options “rename,” “duplicate,” and “delete”</div>
      <div>{ props.repeatedLaunchTimes?.simplePreset }</div>
      <ClockIcon className="h-6 w-6 text-slate-500" />
      <RemainingTime minutesRemaining={ props.nextLaunchIn } />
    </div>
  )
}
  
export default PhantomItem