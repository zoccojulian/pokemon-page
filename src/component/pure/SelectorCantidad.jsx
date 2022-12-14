import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectorCantidad( { cambioNumeroXPaginas , initialStateSeleccion} ) {
  const [age, setAge] = useState(initialStateSeleccion)

  const handleChange = (event) => {
    cambioNumeroXPaginas(event.target.value);
    setAge(event.target.value);
  };


  return (
    <div>
      <FormControl sx={
        { 
          m: 1, 
          minWidth: 120, 
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
          }
        }>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={ { height: 35 , width: 100} }
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <FormHelperText>Pokemon por Página</FormHelperText>
      </FormControl>
    </div>
  );
}