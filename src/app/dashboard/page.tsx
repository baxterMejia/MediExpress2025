'use client';
import * as React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '@/components/dashboard/overview/budget';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { Loader } from '@/components/common/Loader';
import { getCryptoData } from '@/lib/api/crypto.service';
import Typography from '@mui/material/Typography';
import { getBitcoinMonthlyHighsLows } from '@/lib/api/price.service';
import { getMarketDistribution } from '@/lib/api/market-distribution.service';

export default function Page(): React.JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>(null);
  const [monthlyData, setMonthlyData] = React.useState<any[]>([]);
  const [trafficData, setTrafficData] = React.useState<any>([]);
  const [RoleUser, setRoleUser] = React.useState<string | null>(null);


  React.useEffect(() => {
    const rol = sessionStorage.getItem('role');
    setRoleUser(rol == 'admin' ? 'Administrador' : 'Usuario');
  }, []);

  if (loading) {
    return <Loader />;
  }

  const btc = data?.find((coin: any) => coin.id === 'bitcoin');
  const eth = data?.find((coin: any) => coin.id === 'ethereum');

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        ¡Bienvenido {RoleUser}!
      </Typography>
      {RoleUser === 'Administrador' ? (
        <Grid container spacing={3}>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Total de solicitudes de hoy' diff={0} trend="up" sx={{ height: '100%' }} value={`4`} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Tiempo promedio de entrega' diff={0} trend="up" sx={{ height: '100%' }} value={`1 hora y 45 minutos`} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Entregas a tiempo' diff={0} trend="up" sx={{ height: '100%' }} value={`54`} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Solicitudes por EPS' diff={0} trend="up" sx={{ height: '100%' }} value={`15`} />
          </Grid>
          <Grid lg={4} md={6} xs={12}>
            <Traffic
              chartSeries={[72, 28]} // 72% entregados, 28% pendientes
              labels={['Entregados', 'Pendientes']}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Mis solicitudes hoy' diff={0} trend="up" sx={{ height: '100%' }} value={`4`} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Tiempo promedio de entrega' diff={0} trend="up" sx={{ height: '100%' }} value={`1 hora y 45 minutos`} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Entregas a tiempo' diff={0} trend="up" sx={{ height: '100%' }} value={`54`} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <Budget title='Solicitudes por EPS' diff={0} trend="up" sx={{ height: '100%' }} value={`15`} />
          </Grid>
          <Grid lg={4} md={6} xs={12}>
            <Traffic
              chartSeries={[72, 28]} // 72% entregados, 28% pendientes
              labels={['Entregados', 'Pendientes']}
            />
          </Grid>
        </Grid>
      )}

    </>
  );
}
