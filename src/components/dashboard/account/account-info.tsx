'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const defaultUser = {
  name: 'Cliente',
  avatar: '/assets/avatar.png',
  jobTitle: 'Cliente',
  country: 'COLOMBIA',
  city: 'Bogotá',
  timezone: 'GMT-5',
};

const adminUser = {
  name: 'Administrador',
  avatar: '/assets/avatar-10.png',
  jobTitle: 'Administrador',
  country: 'COLOMBIA',
  city: 'Bogotá',
  timezone: 'GMT-5',
};

export function AccountInfo(): React.JSX.Element {
  const [user, setUser] = React.useState(defaultUser);

  React.useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
      setUser(adminUser);
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Actualiza Foto
        </Button>
      </CardActions>
    </Card>
  );
}
