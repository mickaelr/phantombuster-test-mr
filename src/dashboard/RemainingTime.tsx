import { convertRemainingTime } from '../utils'

function RemainingTime(props: {minutesRemaining?: number}) {
  if (props.minutesRemaining) {
    const { days, hours, minutes } = convertRemainingTime(props.minutesRemaining);

    if(days > 0) {
      return <div>in { days } days</div>;
    } else {
      return <div>in { hours } hours and { minutes } minutes</div>;
    }
  }

  return;
}
  
export default RemainingTime