/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [{
        id: 'welcome',
        icon: 'img/icon/home.svg',
        label: 'navBar.welcome',
        to: '/welcome'
    },
    {
        id: 'listRoutes',
        icon: 'img/icon/location.svg',
        label: 'navBar.routes',
        to: '/routes/listRoutes'
    },
    {
        id: 'addFile',
        icon: 'img/icon/plus.svg',
        label: 'navBar.addFile',
        to: '/routes/addFile'
    },
    {
        id: 'friends',
        icon: 'img/icon/amigo.svg',
        label: 'navBar.friends',
        to: '/friends/listFriends'
    },
    {
        id: 'addRoute',
        icon: 'img/icon/addRoute.svg',
        label: 'navBar.addRoute',
        to: '/routes/addRoute'
    },
    {
        id: 'shareRoute',
        icon: 'img/icon/share.svg',
        label: 'navBar.shareRoute',
        to: '/routes/shareRoute'
    },
    {
        id: 'friendRoute',
        icon: 'img/icon/amigolocalizado.svg',
        label: 'navBar.friendRoute',
        to: '/friendRoute'
    }

];

export const ProfileOptions = [{
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