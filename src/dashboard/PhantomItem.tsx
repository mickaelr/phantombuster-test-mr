import { IPhantom } from '../phantom'

function PhantomItem(props: IPhantom) {
    return (
      <div>
        <div>{ props.name }</div>
      </div>
    )
  }
  
  export default PhantomItem