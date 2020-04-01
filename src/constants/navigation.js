/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
    {
        id: 'welcome',
        icon: 'img/icon/home.svg',
        label: 'navBar.welcome',
        to: '/welcome'
    },
    {
        id: 'listRoutes',
        icon: 'img/icon/location.svg',
        label: 'navBar.routes',
        to: '/listRoutes'
    },
    {
        id: 'addFile',
        icon: 'img/icon/plus.svg',
        label: 'Add File',
        to: '/addFile'
    },

  {
    id: 'friends',
    icon: 'img/icon/amigo.svg',
    label: 'navBar.friends',
    to: '/friends'
  },
  {
    id: 'addRoute',
    icon: '/img/icon/addRoute.svg',
    label: 'Add Route',
    to: '/addRoute'
  },
    {
        id: 'shareRoute',
        icon: '/img/icon/share.svg',
        label: 'Share Route',
        to: '/shareRoute'
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


