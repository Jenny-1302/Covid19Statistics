import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export const BarCard = () => {
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
                    image='/cases.png'
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Positive cases
                    </Typography>
                    <Typography>
                        This chart shows and compares the positive cases.
                    </Typography>
                </CardContent>
                <CardActions>

                    <Button size="small" href='/bar-chart'>View</Button>

                </CardActions>
            </Card>

        </Grid>
    )
}


