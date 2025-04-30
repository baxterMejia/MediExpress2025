'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

const countries = [
  { value: 'colombia', label: 'Colombia' },
  { value: 'usa', label: 'Estados Unidos' },
  { value: 'spain', label: 'España' },
];

const epsOptions = [
  { value: 'sanitas', label: 'Sanitas' },
  { value: 'sura', label: 'Sura' },
  { value: 'colpatria', label: 'Colpatria' },
  { value: 'famisanar', label: 'Famisanar' },
  { value: 'coomeva', label: 'Coomeva' },
];

export function AccountDetailsForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="Información de contacto y personal" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Nombre</InputLabel>
                <OutlinedInput defaultValue="Johan Sebastián" label="Nombre" name="firstName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Apellido</InputLabel>
                <OutlinedInput defaultValue="Mejía Carmona" label="Apellido" name="lastName" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Correo electrónico</InputLabel>
                <OutlinedInput defaultValue="johan@mejia.io" label="Correo electrónico" name="email" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Número de teléfono</InputLabel>
                <OutlinedInput defaultValue="+57 310 864 58 29" label="Número de teléfono" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>País</InputLabel>
                <Select defaultValue="colombia" label="País" name="country" variant="outlined">
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Ciudad</InputLabel>
                <OutlinedInput defaultValue="Chía, Cundinamarca" label="Ciudad" name="city" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>EPS</InputLabel>
                <Select defaultValue="sanitas" label="EPS" name="eps" variant="outlined">
                  {epsOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Guardar detalles</Button>
        </CardActions>
      </Card>
    </form>
  );
}
