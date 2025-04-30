import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { paths } from '@/paths';
import { logoutUser } from '@/lib/auth/auth.service';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {

  const router = useRouter();

  const handleSignOut = React.useCallback((): void => {
    logoutUser(); // Solo elimina el token
    router.replace(paths.auth.signIn); // Redirige al login
  }, [router]);

  const userClient = {
    id: 'USR-000',
    avatar: '/assets/avatar.png',
    firstName: 'Cliente',
    lastName: '',
    email: 'Cliente@ejemplo.io',
  };

  const userAdmin = {
    id: 'USR-001',
    avatar: '/assets/avatar-10.png',
    firstName: 'Admin',
    lastName: '',
    email: 'Admin@ejemplo.io',
  };



  const role = sessionStorage.getItem('role') || '';
  const userLogin = role === 'admin' ? userAdmin : userClient;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{userLogin.firstName}</Typography>
        <Typography color="text.secondary" variant="body2">
          {userLogin.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={RouterLink} href={paths.dashboard.settings} onClick={onClose}>
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Ajustes
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.dashboard.account} onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
