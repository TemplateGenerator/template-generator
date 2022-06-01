import * as React from 'react';
import axios from 'axios';
import SignIn from './SignIn';
import {useHistory} from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';

export const Admin = () => {
    let history = useHistory();

    //states

    React.useEffect(() => {
        handleAuthentication();
    }, []);

    const handleAuthentication = () => {
        axios({
            method: 'GET',
            url: '/accounts/isauthenticated'
        }).then(res => {
            if (!res.data) {
                history.push('/signin');
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="frontend"
                    label="Frontend technology"
                    name="frontend"
                    autoComplete="frontend"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="frontendimage"
                    label="Frontend technology image (only .svg, max 50KB)"
                    name="frontendimage"
                    autoFocus
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="backend"
                    label="Backend technology"
                    name="backend"
                    autoComplete="backend"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="backendimage"
                    label="Backend technology image (only .svg, max 50KB)"
                    name="backendimage"
                    autoFocus
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    submit
                </Button>
            </Box>
        </Container>
        );
};