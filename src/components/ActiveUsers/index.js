import { GoDotFill } from "react-icons/go";
import './index.css'

const ActiveUsers = ({user}) => (
    <li className="active-user">
        <GoDotFill color="green" size={14} style={{marginRight: '5px'}} />
        <p style={{margin: '0px', width: '100px'}}>{user}</p>
    </li>
)


export default ActiveUsers