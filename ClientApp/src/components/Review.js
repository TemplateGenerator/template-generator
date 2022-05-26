import Typography from '@mui/material/Typography';
import * as React from 'react';
import Grid from '@mui/material/Grid';

export const Review = ({ frontend, backend }) => {

    return (
        <div>
            <Typography sx={{ mt: 3, mb: 5 }} variant="h5" align="left">Review the selection</Typography>
            <Grid sx={{ flexGrow: 1 }} direction="column" container justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ md: 5 }}>
                <Grid item key={frontend} name={frontend}>
                    <Typography sx={{ mt: 3, mb: 5 }} variant="h6" align="center">
                        <b>Frontend framework:</b> {frontend.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid item key={backend} name={backend}>
                    <Typography sx={{ mt: 0, mb: 3 }} variant="h6" align="center">
                        <b>Backend framework:</b> {backend.toUpperCase()}
                    </Typography>
                </Grid>
            </Grid>
        </div>
        );
}