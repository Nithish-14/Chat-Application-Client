import { Button } from "@mui/material"
import { useSetRecoilState, useRecoilValue } from "recoil";
import {Link} from 'react-router-dom'
import { roomState, dataState } from '../../store/atoms/form';


const ButtonContainer = () => {
    const updateButtonState = useSetRecoilState(roomState);
    const {name, room} = useRecoilValue(dataState);

    const onClickCreateButton = (e) => {
        updateButtonState('create');
        if (!name || !room) {
            return e.preventDefault();
        } else {
            return null;
        }
    }

    const onClickJoinButton = (e) => {
        updateButtonState('join');
        if (!name || !room) {
            return e.preventDefault();
        } else {
            return null;
        }
    }

    return (
        <>
        <Link onClick={onClickCreateButton} to={`/chat/${room}`}>
            <Button type="submit" variant={"contained"} style={{marginRight: '20px'}} size={"medium"}>Create Room</Button>
        </Link>
        <Link onClick={onClickJoinButton} to={`/chat/${room}`}>
            <Button type="submit" variant={"contained"} size={"medium"}>Join Room</Button>
        </Link>
        </>
    )
}

export default ButtonContainer