import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useData } from '../hooks/useData';
import StatesButton from '../components/StatesButton';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

// Importa format de date-fns para formatear fechas
import { format } from 'date-fns';

// Registrar componentes de Chart.js que se usarán en el gráfico
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

export default function BarChart({ isInitialLoad }) {
    const [selectedState, setSelectedState] = useState('ca');
    const [selectedState2, setSelectedState2] = useState('ny');
    const { info } = useData(selectedState);
    const { info: info2 } = useData(selectedState2);
    const defaultTheme = createTheme();

    const initialDates = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.dateModified) : [];
    const initialPositive = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.positive) : [];
    const initialPositive2 = info2 && info2.length >= 5 ? info2.slice(0, 5).map((item) => item.positive) : [];

    const [dates, setDates] = useState(initialDates);
    const [positive, setPositive] = useState(initialPositive);
    const [positive2, setPositive2] = useState(initialPositive2);

    const handleAddData = () => {
        if (info && info.length > dates.length && info2 && info2.length > dates.length) {
            const newIndex = dates.length;
            const newDate = info[newIndex].dateModified;
            const newPositive = info[newIndex].positive;
            const newPositive2 = info2[newIndex].positive;

            setDates([...dates, newDate]);
            setPositive([...positive, newPositive]);
            setPositive2([...positive2, newPositive2]);
        }
    };



    const handleRemoveData = () => {
        if (dates.length > 5) {
            setDates(dates.slice(0, -1));
            setPositive(positive.slice(0, -1));
            setPositive2(positive2.slice(0, -1));
        }
    };

    useEffect(() => {
        setDates([]);
        setPositive([]);
        setPositive2([]);
    }, [selectedState]);

    useEffect(() => {
        const initialDates = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.dateModified) : [];
        const initialPositive = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.positive) : [];
        const initialPositive2 = info2 && info2.length >= 5 ? info2.slice(0, 5).map((item) => item.positive) : [];
        setDates(initialDates);
        setPositive(initialPositive);
        setPositive2(initialPositive2);
    }, [info, info2]);

    const formatDate = (date) => {
        return format(new Date(date), 'yyyy-MM-dd');
    };

    const chartData = {
        labels: dates.map(formatDate),
        datasets: [
            {
                label: `${selectedState} Cases per day`,
                data: positive,
                fill: true,
                tension: 0.5,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: `${selectedState2} Cases per day`,
                data: positive2,
                fill: true,
                tension: 0.5,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cases',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
    };

    useEffect(() => {
        if (isInitialLoad) {
            // Realiza alguna acción en la primera carga
        }
    }, [isInitialLoad]);

    const handleChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleChange2 = (event) => {
        setSelectedState2(event.target.value);
    };

    const containerStyle = {
        backgroundColor: 'rgba(169, 169, 169, 0.4)',
        padding: '20px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const formatTableDate = (date) => {
        return formatDate(date);
    };

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const tableData = dates.map((date, index) => ({
            date,
            positive: positive[index],
            positive2: positive2[index], // Agregar datos del segundo estado a la tabla
        }));
        setTableData(tableData);
    }, [dates, positive, positive2]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <IconButton href='/'>
                        <ArrowBackIcon sx={{ mr: 2, color: "white" }} />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Cases per state
                    </Typography>
                </Toolbar>
            </AppBar>
            <StatesButton selectedState={selectedState} handleChange={handleChange} />
            <StatesButton selectedState={selectedState2} handleChange={handleChange2} /> {/* Botón para el segundo estado */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 2,
                    pb: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Container sx={containerStyle}>
                        <Bar data={chartData} options={chartOptions} />
                    </Container>
                    <Stack spacing={2} direction="row" sx={{ pt: 2 }}>
                        <Button size="small" onClick={handleAddData} variant="contained" endIcon={<AddIcon />}>
                            Add data
                        </Button>
                        <Button size="small" onClick={handleRemoveData} disabled={dates.length <= 5} variant="contained" endIcon={<RemoveIcon />}>
                            Remove data
                        </Button>
                    </Stack>

                    <Container sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }} maxWidth="xs">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: '10px',
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Cases per state
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <table style={{ margin: '10px' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ padding: '10px' }}>Date</th>
                                                <th style={{ padding: '10px' }}>Cases ({selectedState})</th>
                                                <th style={{ padding: '10px' }}>Cases ({selectedState2})</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((data, index) => (
                                                <tr key={index}>
                                                    <td style={{ padding: '10px' }}>{formatTableDate(data.date)}</td>
                                                    <td style={{ padding: '10px' }}>{data.positive}</td>
                                                    <td style={{ padding: '10px' }}>{data.positive2}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Container>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
