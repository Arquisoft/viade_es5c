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
    id: 'listRoutes',
    icon: '/img/bars-nav.svg',
    label: 'navBar.routes',
    to: '/listRoutes'
  },
  {
    id: 'addFile',
    icon: '/img/icon/mapa_azul.png',
    label: 'Add File',
    to: '/addFile'
  },

  {
    id: 'friends',
    icon: '/img/icon/mapa_azul.png',
    label: 'navBar.friends',
    to: '/friends'
  },
  {
    id: 'addRoute',
    icon: '/img/icon/mapa_azul.png',
    label: 'Add Route',
    to: '/addRoute'
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


