import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Container } from 'reactstrap';
import Grid from '@mui/material/Grid';

export const SelectFramework = ({ frameworks, onFrameworkChange }) => {
    const [framework, setFramework] = React.useState("");

    function importAll(r) {
        return r.keys().map(r);
    }

    //const allimages = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));
    //const some = require.context('./', false, /\.(png|jpe?g|svg)$/);
    //console.log(some);
    //const onFrameworkChange = (value) => {
    //    setFramework(value);
    //}

    return (
        <div>
            <Grid sx={{ flexGrow: 1 }} container justifyContent="center" rowSpacing={5} columnSpacing={{ md: 5 }} flexWrap>
                {Object.values(frameworks).map((label, index) => {
                    return (
                        <Grid item key={label} name={label} onClick={()=>onFrameworkChange(label)}>
                            <Card sx={{ maxwidth: 20 }} key={label}>
                                <CardActionArea key={label}>
                                    {/*<img src={ allimages.react } height="140"/>*/}
                                    <img src={ process.env.PUBLIC_URL+'/images/'+label+'.svg' } height="140"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {label.toUpperCase()}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}