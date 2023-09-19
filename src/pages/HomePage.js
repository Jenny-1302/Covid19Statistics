import React from 'react'
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MortalityCard } from '../components/MortalityCard';
import { BarCard } from '../components/BarCard';


export const HomePage = () => {

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />

            <AppBar position="relative">
                <Toolbar>
                    <LocalHospitalIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Covid Information
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Covid Statistics
                        </Typography>

                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            This page provides information and charts about the COVID evolution per all American states.
                        </Typography>
                    </Container>
                </Box>

                <Container sx={{ py: 3 }} maxWidth="md">
                    <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <MortalityCard />
                        <BarCard />


                    </Grid>
                </Container>

            </main>

            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Project developed by Jennifer Estefanny Rivera Esquivel
                </Typography>
            </Box>

        </ThemeProvider>

    )
}