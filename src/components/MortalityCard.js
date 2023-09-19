import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const MortalityCard = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
    <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
        <CardMedia
            component="div"
            sx={{
                // 16:9
                pt: '56.25%',
            }}
            image='/deaths.png'
        />
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
                Mortality per state
            </Typography>
            <Typography>
                This chart shows the mortality per state.
            </Typography>
        </CardContent>
        <CardActions>

            <Button size="small" href='/lines-chart'>View</Button>

        </CardActions>
    </Card>

</Grid>
  )
}


