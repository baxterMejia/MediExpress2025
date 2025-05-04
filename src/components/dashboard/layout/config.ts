import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  // Usuario (Paciente)
  { key: 'mis-solicitudes', title: 'Mis Solicitudes', href: paths.dashboard.overview, icon: 'list', role: 'user' },
  { key: 'nueva-solicitud', title: 'Nueva Solicitud', href: paths.dashboard.customers, icon: 'plus-circle', role: 'user' },
  { key: 'notificaciones', title: 'Notificaciones', href: paths.dashboard.settings, icon: 'bell', role: 'user' },
  { key: 'mi-perfil', title: 'Mi Perfil', href: paths.dashboard.account, icon: 'user', role: 'user' },

  // Administrador
  { key: 'solicitudes-pendientes', title: 'Solicitudes Pendientes', href: paths.dashboard.overview, icon: 'clipboard-list', role: 'admin' },
  { key: 'stock-medicamentos', title: 'Medicamentos en Stock', href: paths.dashboard.customers, icon: 'package', role: 'admin' },
  { key: 'agenda-entregas', title: 'Notificaciones del Sistema', href: paths.dashboard.settings, icon: 'bell-ring', role: 'admin' },
  { key: 'mi-perfil', title: 'Mi Perfil', href: paths.dashboard.account, icon: 'admin', role: 'admin' },
] satisfies NavItemConfig[];


