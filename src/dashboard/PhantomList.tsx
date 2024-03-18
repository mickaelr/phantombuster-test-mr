import PhantomItem from './PhantomItem'
import { IPhantom, IPhantomActions } from '../phantoms'

function PhantomList(props: { items: IPhantom[], actions: IPhantomActions }) {
  
    return (
      <div>
        <div>
          { props.items.map((phantom, index) => (
            <PhantomItem key={index} {...phantom} actions={props.actions} />
          ))}
        </div>
      </div>
    )
  }
  
  export default PhantomList