'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface FormValues {
  notifications: boolean;      // Habilitar notificaciones
  deliveryDate: Dayjs | null;  // Fecha de entrega
  pickUpDate: Dayjs | null;    // Fecha de recogida
}

interface Notification {
  id: number;
  type: string;  // "Entrega" o "Recogida"
  date: Dayjs;
  address: string;
}

const defaultValues: FormValues = {
  notifications: true,
  deliveryDate: dayjs().add(2, 'days'),  // Ejemplo, entrega dentro de 2 días
  pickUpDate: dayjs().add(4, 'days'),    // Ejemplo, recogida dentro de 4 días
};

const pastNotifications: Notification[] = [
  {
    id: 1,
    type: "Entrega",
    date: dayjs().subtract(1, 'days'),
    address: 'Calle Ficticia 123, El Carmen',
  },
  {
    id: 2,
    type: "Recogida",
    date: dayjs().subtract(2, 'days'),
    address: 'Calle Real 456, El Carmen',
  },
  {
    id: 3,
    type: "Entrega",
    date: dayjs().subtract(5, 'days'),
    address: 'Calle Alegría 789, El Carmen',
  },
];

export function Notifications(): React.JSX.Element {
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues,
  });

  const notificationsEnabled = watch('notifications');

  const onSubmit = (data: FormValues) => {
    alert('Notificación de servicio enviada!');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          title="Notificaciones de Servicio de Medicamentos"
          subheader="Gestionar entregas y recogidas de medicamentos"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="notifications"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Activar notificaciones"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Notificaciones pasadas</Typography>
              <hr></hr>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Dirección</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pastNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell>{notification.id}</TableCell>
                        <TableCell>{notification.type}</TableCell>
                        <TableCell>{notification.date.format('DD/MM/YYYY')}</TableCell>
                        <TableCell>{notification.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Enviar notificación
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
