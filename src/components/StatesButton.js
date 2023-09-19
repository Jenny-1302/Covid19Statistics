import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';




const StatesButton = ({ selectedState, handleChange }) => {

; // Llama a useStyles dentro de tu componente
    return (
        <Box sx={{ minWidth: 40, pt: 2, pl: 2, pb: 2 }}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedState}
                    label="State"
                    onChange={handleChange}
                >
                    <MenuItem value="al">Alabama</MenuItem>
                    <MenuItem value="ak">Alaska</MenuItem>
                    <MenuItem value="az">Arizona</MenuItem>
                    <MenuItem value="ar">Arkansas</MenuItem>
                    <MenuItem value="ca">California</MenuItem>
                    <MenuItem value="co">Colorado</MenuItem>
                    <MenuItem value="ct">Connecticut</MenuItem>
                    <MenuItem value="de">Delaware</MenuItem>
                    <MenuItem value="fl">Florida</MenuItem>
                    <MenuItem value="ga">Georgia</MenuItem>
                    <MenuItem value="hi">Hawaii</MenuItem>
                    <MenuItem value="id">Idaho</MenuItem>
                    <MenuItem value="il">Illinois</MenuItem>
                    <MenuItem value="in">Indiana</MenuItem>
                    <MenuItem value="ia">Iowa</MenuItem>
                    <MenuItem value="ks">Kansas</MenuItem>
                    <MenuItem value="ky">Kentucky</MenuItem>
                    <MenuItem value="la">Louisiana</MenuItem>
                    <MenuItem value="me">Maine</MenuItem>
                    <MenuItem value="md">Maryland</MenuItem>
                    <MenuItem value="ma">Massachusetts</MenuItem>
                    <MenuItem value="mi">Michigan</MenuItem>
                    <MenuItem value="mn">Minnesota</MenuItem>
                    <MenuItem value="ms">Mississippi</MenuItem>
                    <MenuItem value="mo">Missouri</MenuItem>
                    <MenuItem value="mt">Montana</MenuItem>
                    <MenuItem value="ne">Nebraska</MenuItem>
                    <MenuItem value="nv">Nevada</MenuItem>
                    <MenuItem value="nh">New Hampshire</MenuItem>
                    <MenuItem value="nj">New Jersey</MenuItem>
                    <MenuItem value="nm">New Mexico</MenuItem>
                    <MenuItem value="ny">New York</MenuItem>
                    <MenuItem value="nc">North Carolina</MenuItem>
                    <MenuItem value="nd">North Dakota</MenuItem>
                    <MenuItem value="oh">Ohio</MenuItem>
                    <MenuItem value="ok">Oklahoma</MenuItem>
                    <MenuItem value="or">Oregon</MenuItem>
                    <MenuItem value="pa">Pennsylvania</MenuItem>
                    <MenuItem value="ri">Rhode Island</MenuItem>
                    <MenuItem value="sc">South Carolina</MenuItem>
                    <MenuItem value="sd">South Dakota</MenuItem>
                    <MenuItem value="tn">Tennessee</MenuItem>
                    <MenuItem value="tx">Texas</MenuItem>
                    <MenuItem value="ut">Utah</MenuItem>
                    <MenuItem value="vt">Vermont</MenuItem>
                    <MenuItem value="va">Virginia</MenuItem>
                    <MenuItem value="wa">Washington</MenuItem>
                    <MenuItem value="wv">West Virginia</MenuItem>
                    <MenuItem value="wi">Wisconsin</MenuItem>
                    <MenuItem value="wy">Wyoming</MenuItem>

                </Select>
            </FormControl>

        </Box>

    );
};

export default StatesButton;

