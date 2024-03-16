import PhantomItem from './PhantomItem'
import { IPhantom } from '../phantom'

function PhantomList(props: { items: IPhantom[] }) {
  
    return (
      <div>
        <div>
          { props.items.map((phantom, index) => (
            <PhantomItem key={index} {...phantom} />
          ))}
        </div>
      </div>
    )
  }
  
  export default PhantomList