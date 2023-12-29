import {Container, Grid, Typography, TextField} from '@mui/material'
import {useRecoilState, useRecoilValue} from 'recoil'
import { FaRegCopyright } from "react-icons/fa6";
import { dataState } from '../../store/atoms/form';
import ButtonContainer from '../ButtonContainer';
import { errorState } from './../../store/atoms/error';

import './index.css'

const NameField = () => {
    const [data, updateData] = useRecoilState(dataState);

    return <TextField autoComplete='false' onChange={(e) => updateData({...data, name: e.target.value})} value={data.name} fullWidth required margin={"normal"} variant={"outlined"} label={"Username"} />
}

const RoomField = () => {
    const [data, updateData] = useRecoilState(dataState);

    return <TextField autoComplete='false' onChange={(e) => updateData({...data, room: e.target.value})} value={data.room} fullWidth required margin={"normal"} variant={"outlined"} label={"Room ID"} />
}

const Form = () => (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <NameField />
            <RoomField />
        </div>
)

const LandingPage = () => {
    const errorMessage = useRecoilValue(errorState);

    return (
        <Container maxWidth={"xl"} className="container" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <Grid container className="container2">
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Typography style={{lineHeight: '1.4', color: '#0458de'}} component={"h1"} variant={"h4"}>Experience Instant Connection: Unleash the Power of Real-Time Conversations with Our Chat Application</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className="form-container">
                    <Typography variant={"h6"} style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Typography>
                    <Form />
                    <Container disableGutters style={{marginTop: '20px', textAlign: 'center'}}>
                        <ButtonContainer />
                    </Container>
                </Grid>
            </Grid>
            <h1 className="copyright"><FaRegCopyright style={{marginBottom: '-2.5px'}} /> 2023 Nithish</h1>
        </Container>)
}



export default LandingPage;