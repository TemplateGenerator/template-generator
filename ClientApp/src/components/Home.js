import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';

const steps = ['SELECT FRONTEND', 'SELECT BACKEND', 'REVIEW'];

export function Home() {

    return (
        <Container component="main">
            <Grid container columnSpacing={5}>
                <Grid item xs alignSelf='center'>
                    <Typography align='center'>
                        <b>KICKSTART YOUR PROJECT WITH READILY AVAILABLE TEMPLATES</b>
                    </Typography>
                    <br/>
                    <Typography align='center'>
                        YOUR NEW PROJECT IS JUST A FEW CLICKS AWAY..
                    </Typography>
                </Grid>
                <Grid item xs>
                    <img src={process.env.PUBLIC_URL + '/images/LaunchingRocket.svg'} />
                </Grid>
            </Grid>
        </Container>
    );
}
