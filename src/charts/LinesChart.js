import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function LinesChart({ isInitialLoad }) {
  const [selectedState, setSelectedState] = useState('ca');
  const { info } = useData(selectedState);
  const defaultTheme = createTheme();

  // Inicializar las fechas y datos con al menos 5 datos si están disponibles
  const initialDates = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.dateModified) : [];
  const initialDeath = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.death) : [];

  const [dates, setDates] = useState(initialDates);
  const [death, setDeath] = useState(initialDeath);

  const handleAddData = () => {
    // Agregar una fecha y sus datos
    if (info && info.length > dates.length) {
      const newIndex = dates.length; // Índice de la próxima fecha a agregar
      const newDate = info[newIndex].dateModified;
      const newDeath = info[newIndex].death;

      setDates([...dates, newDate]);
      setDeath([...death, newDeath]);
    }
  };

  const handleRemoveData = () => {
    // Quitar la última fecha y sus datos (siempre que haya al menos 5 fechas)
    if (dates.length > 5) {
      setDates(dates.slice(0, -1));
      setDeath(death.slice(0, -1));
    }
  };

  // Efecto para limpiar los datos cuando cambia el estado seleccionado
  useEffect(() => {
    setDates([]);
    setDeath([]);
  }, [selectedState]);

  useEffect(() => {
    // Actualizar los datos iniciales cuando cambia la información desde useData
    const initialDates = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.dateModified) : [];
    const initialDeath = info && info.length >= 5 ? info.slice(0, 5).map((item) => item.death) : [];
    setDates(initialDates);
    setDeath(initialDeath);
  }, [info]);

  // Función para dar formato a las fechas antes de mostrarlas
  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd'); // Ajusta el formato según tus preferencias
  };

  const chartData = {
    labels: dates.map(formatDate), // Formatea las fechas antes de usarlas en el gráfico
    datasets: [
      {
        label: 'Deaths per day',
        data: death,
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', 
        pointBorderColor: 'rgba(54, 162, 235, 0.2)' 
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
          text: 'Deaths',
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

  const containerStyle = {
    backgroundColor: 'rgba(169, 169, 169, 0.4)',  
    padding: '20px', 
    borderRadius: '20px',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
  };

  // Función para dar formato a las fechas antes de mostrarlas en la tabla
  const formatTableDate = (date) => {
    return formatDate(date);
  };

  const [tableData, setTableData] = useState([]); // Estado para los datos de la tabla

  // Función para actualizar los datos de la tabla cuando se agregan o quitan datos
  useEffect(() => {
    const tableData = dates.map((date, index) => ({
      date,
      death: death[index],
    }));
    setTableData(tableData);
  }, [dates, death]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton href='/'>
            <ArrowBackIcon sx={{ mr: 2, color: "white" }} />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Mortality per state
          </Typography>
        </Toolbar>
      </AppBar>
      <StatesButton selectedState={selectedState} handleChange={handleChange} />
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 2,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Container sx={containerStyle}>
            <Line data={chartData} options={chartOptions} />
          </Container>
          <Stack spacing={2} direction="row" sx={{ pt: 2 }}>
            <Button size="small" onClick={handleAddData} variant="contained" endIcon={<AddIcon />}>
              Add data
            </Button>
            <Button size="small" onClick={handleRemoveData} disabled={dates.length <= 5} variant="contained" endIcon={<RemoveIcon />}>
              Remove data
            </Button>
          </Stack>

          <Container sx={{ py: 8,    display: 'flex', justifyContent: 'center', alignItems: 'center',  }} maxWidth="xs" >
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
                    Mortality per state
                  </Typography>
                </CardContent>
                <CardContent>
                  <table style={{ margin: '10px' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '10px' }}>Date</th> 
                        <th style={{ padding: '10px' }}>Deaths</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, index) => (
                        <tr key={index}>
                          <td style={{ padding: '10px' }}>{formatTableDate(data.date)}</td> 
                          <td style={{ padding: '10px' }}>{data.death}</td> 
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
