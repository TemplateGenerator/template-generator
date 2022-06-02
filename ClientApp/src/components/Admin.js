import * as React from 'react';
import axios from 'axios';
import SignIn from './SignIn';
import {useHistory, Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import { NavItem, NavLink } from 'reactstrap';
import { toast } from 'react-toastify';

export const Admin = () => {
    let history = useHistory();

    //states
    const [frontend, setFrontend] = React.useState("");
    const [frontendImage, setFrontendImage] = React.useState(undefined);
    const [frontendImageValue, setFrontendImageValue] = React.useState("");
    const [backend, setBackend] = React.useState("");
    const [backendImage, setBackendImage] = React.useState(undefined);
    const [backendImageValue, setBackendImageValue] = React.useState("");

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

    const handleSignout = () => {
        axios({
        method: 'POST',
        url: '/accounts/signout'
        }).then(res => {
            if(res.data.code == 200){
            toast.success('Sign out successful!!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            history.push({pathname: '/signin'});
            }
            else{
            toast.error(res.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            }
        }).catch(error=>{toast.error('Something went wrong, please try again!!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });})
    }

    const handleFrontendImage = (event) => {
        let imageData = event.target.files[0];
        if(imageData.type !== "image/svg+xml"){
            toast.error('Only .svg files are accepted', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            setFrontendImage(undefined);
            setFrontendImageValue("");
            return;
        }
        if(imageData.size > 51200){
            toast.error('image size should be <50kb', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            setFrontendImage(undefined);
            setFrontendImageValue("");
            return;
        }
        setFrontendImage(imageData);
        setFrontendImageValue(event.target.value);
    }

    const handleBackendImage = (event) => {
        let imageData = event.target.files[0];
        if(imageData.type !== "image/svg+xml"){
            toast.error('Only .svg files are accepted', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            setBackendImage(undefined);
            setBackendImageValue("");
            return;
        }
        if(imageData.size > 51200){
            toast.error('image size should be <50kb', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            setBackendImage(undefined);
            setBackendImageValue("");
            return;
        }
        setBackendImage(imageData);
        setBackendImageValue(event.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <ul className="navbar-nav flex-grow" style={{alignItems:"flex-end"}}>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="#" onClick={handleSignout}>Sign out</NavLink>
                </NavItem>
            </ul>
            <CssBaseline />
            <Box
                sx={{
                marginTop: 2,
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
                    onChange={(event)=>{setFrontend(event.target.value)}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="frontendimage"
                    label="Frontend technology image (only .svg, max 50KB)"
                    name="frontendimage"
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={frontendImageValue}
                    onChange={handleFrontendImage}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="backend"
                    label="Backend technology"
                    name="backend"
                    autoComplete="backend"
                    onChange={(event)=>{setBackend(event.target.value)}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="backendimage"
                    label="Backend technology image (only .svg, max 50KB)"
                    name="backendimage"
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={backendImageValue}
                    onChange={handleBackendImage}
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