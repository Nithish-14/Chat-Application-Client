import { useRecoilValue } from 'recoil';
import { dataState } from '../../store/atoms/form';
import './index.css'

const Message = ({m}) => {
    const {author, admin, message} = m;
    const {name} = useRecoilValue(dataState);
    const time = new Date();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    return (<div className={`message-align-container ${name === author ? 'right-align' : null}`}> 
            <div className={`message-content-container ${name === author ? 'author' : null}`}>
                <p className="time2">{author} {admin ? '(Admin)' : null}</p>
                <p className="message-content">{message}</p>
                <p className="time">{hours%12}:{minutes} {hours < 12 ? 'AM' : 'PM'}</p>
            </div>
    </div>)
}

export default Message