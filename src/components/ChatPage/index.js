import {io} from 'socket.io-client';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {Bars} from 'react-loader-spinner'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {v4} from 'uuid'
import ScrollToBottom from 'react-scroll-to-bottom'
import { loadingState } from '../../store/atoms/isLoading';
import { messageState } from '../../store/atoms/message';
import { IoMdSend } from "react-icons/io";
import { Button, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import Message from '../Message';
import { messagesState } from '../../store/atoms/messages';
import { dataState } from '../../store/atoms/form';
import { roomState } from '../../store/atoms/form';
import { usersState } from '../../store/atoms/activeusers';
import ActiveUsers from '../ActiveUsers';
import './index.css';
import { errorState } from './../../store/atoms/error';

const ENDPOINT = 'https://chat-application-server-txs5.onrender.com';

let socket;

const ChatPage = () => {
    const [message, setMessage] = useRecoilState(messageState);
    const [messages, setMessages] = useRecoilState(messagesState);
    const [activeusers, setActiveUsers] = useRecoilState(usersState);
    const room = useRecoilValue(roomState);
    const userData = useRecoilValue(dataState);
    const [currentLoadingState, setLoadingState] = useRecoilState(loadingState);
    const setErrorMessage = useSetRecoilState(errorState);
    const navigate = useNavigate();

    window.addEventListener('beforeunload', (event) => {
        event.preventDefault()

        const customMessage = "Reloading the page may result in your removal from this room.";


        const userConfirmed = false;

        if (userConfirmed) {
            event.returnValue = null;
        } else {
            event.returnValue = customMessage;
        }

    })

    useEffect(() => {
         socket = io(ENDPOINT);

         socket.emit(room, {name: userData.name, roomId: userData.room}, (error) => {
            if (error) {
                setErrorMessage(error.error);
                navigate("/", {replace: true});
            } else {
                setErrorMessage('');
            }
         });
         
         setLoadingState('SUCCESS');

    }, []);

    useEffect(() => {
        socket.on('users', ({users}) => {
            setActiveUsers(users);
        })

        socket.on('message', message => {
            //resolve
            setMessages((oldMessages) => [
                ...oldMessages,
                message
            ])
        });

    }, [])

    const successRender = () => (
        <>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{height: '88%', width: '100%'}}>
                    <ScrollToBottom className="message-container">
                        {messages.map(each => <Message m={each} key={v4()} />)}
                    </ScrollToBottom>
                    <Paper elevation={7} component={"form"} onSubmit={(e) => {
                        e.preventDefault();
                        if (message !== '') {
                            socket.emit('sendMessage', {name: userData.name, roomId: userData.room, message}, (error) => {
                                if (error) {
                                    setErrorMessage(error.error);
                                }

                                setMessage('');
                            });
                        }

                    }} sx={{height: '45px', display: 'flex', alignItems: 'center', width: '100%'}}>
                        <InputBase 
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{flex: 1, ml: 3}}
                        placeholder="Enter Message..."
                        inputProps={{ 'aria-label': 'enter message' }} />
                        <IconButton type="submit" sx={{ p: '10px', mr: 1 }} aria-label="message">
                            <IoMdSend />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item lg={3} className="active-users-mobile-view" style={{height: '88%'}}>
                    <Paper elevation={4} sx={{height: '100%', display: 'flex', width: '100%', flexDirection: 'column', alignItems:'center'}}>
                        <Typography variant={"h5"} sx={{mt: 2}}>Active Users</Typography>
                        <ul className="active-users-container">
                            {activeusers.map(each => <ActiveUsers user={each} key={v4()} />)}
                        </ul>
                    </Paper>
                </Grid>
        </>
    )

    const loadingView = () => (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignSelf: 'center'}}>
            <Bars color="#0458de" height="45" />
        </div>
    )



    return (<Grid container className="chat-page-container">
        <Button type="button" variant={"contained"} className="leave-button" onClick={() => {
            socket.disconnect();
            navigate("/", {replace: true});
        }}>Leave</Button>
        {currentLoadingState === 'PROGRESS'? loadingView() : successRender()}
    </Grid>
)
}

export default ChatPage;