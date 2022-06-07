import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { Grid } from '@mui/material';
import './Home.css';

const steps = ['SELECT FRONTEND', 'SELECT BACKEND', 'REVIEW'];

export function Home() {

    return (
        <Container component="main">
            <Grid container columnSpacing={5}>
                <Grid item xs alignSelf='center'>
                    <h2 align='center'>
                        <b>KICKSTART YOUR PROJECT WITH READILY AVAILABLE TEMPLATES</b>
                    </h2>
                    <br/>
                    <h5 align='center'>
                        YOUR NEW PROJECT IS JUST A FEW CLICKS AWAY..
                    </h5>
                </Grid>
                <Grid item xs>
                    <img src={process.env.PUBLIC_URL + '/images/LaunchingRocket.svg'} />
                </Grid>
            </Grid>
            <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <h1 ><b>Demo</b></h1>
                <video className='video' controls xs="true">
                    <source src='https://templatebook.s3.amazonaws.com/demo.mp4' type='video/mp4'/>
                </video>
            </Box>
        </Container>
    );
}
