/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/icono_welcome.png',
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'rutas',
    icon: '/img/icon/mapa_azul.png',
    label: 'navBar.map',
    to: '/rutas'
  },
  {
    id: 'addFile',
    icon: '/img/icon/mapa_azul.png',
    label: 'Add File',
    to: '/addFile'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];


