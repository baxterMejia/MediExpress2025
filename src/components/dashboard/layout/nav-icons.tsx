import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Clipboard as ClipboardIcon } from '@phosphor-icons/react/dist/ssr/Clipboard';
import { Package as PackageIcon } from '@phosphor-icons/react/dist/ssr/Package';
import { Calendar as CalendarIcon } from '@phosphor-icons/react/dist/ssr/Calendar';
import { BellSimple as BellSimpleIcon } from '@phosphor-icons/react/dist/ssr/BellSimple';

export const navIcons = {
  'list': ListIcon,
  'plus-circle': PlusCircleIcon,
  'bell': BellIcon,
  'user': UserIcon,
  'clipboard-list': ClipboardIcon,  // Reemplazado con ClipboardIcon
  'package': PackageIcon,
  'calendar': CalendarIcon,
  'bell-ring': BellSimpleIcon,  // Reemplazado con BellSimpleIcon
} as Record<string, Icon>;

