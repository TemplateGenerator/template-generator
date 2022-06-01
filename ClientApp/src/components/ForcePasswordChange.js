import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


export const ForcePasswordChange = () => {

    let history = useHistory();
    //states
    const [email, setEmail] = React.useState("");
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [messageAlert, setMessageAlert] = React.useState(false);

    const handleUpdatePassword = (event) => {
      event.preventDefault();
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        setMessage("Incorrect email format");
        setMessageAlert(true);
        return;
      }
      if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(newPassword)){
        setMessage("Invalid password");
        setMessageAlert(true);
        return;
      }
      if(newPassword !== confirmNewPassword){
        setMessage("Confirmation password should match password");
        setMessageAlert(true);
        return;
      }
      axios({
        method: 'POST',
        url: '/accounts/forcepasswordchange',
        data: {
          'Email': email,
          'Password': oldPassword,
          'NewPassword': newPassword
        }
      }).then(res => {
        if(res.data.code == 200){
          setMessage("");
          setMessageAlert(false);
          toast.success('Password update successful!!', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
          history.push('/signin');
        }
        else{
          setMessage(res.data.message);
          setMessageAlert(true);
        }
      }).catch(error => {
        toast.error('Something went wrong, Please try again!!', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
        setMessage("");
        setMessageAlert(false);
      });
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {messageAlert ? <Alert severity='error'>{message}</Alert> : <></>}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              name="oldpassword"
              label="Old Password"
              type="password"
              id="oldpassword"
              onChange={(event)=>{setOldPassword(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              name="newpassword"
              label="New Password"
              type="password"
              id="newpassword"
              onChange={(event)=>{setNewPassword(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmnewpassword"
              label="Confirm New Password"
              type="password"
              id="confirmnewpassword"
              onChange={(event)=>{setConfirmNewPassword(event.target.value)}}
            />
            <Grid container columnSpacing={5}>
              <Grid item xs>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleUpdatePassword}
                    >
                    Update Password
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? SIgn In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}