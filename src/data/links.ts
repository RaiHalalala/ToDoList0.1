export const links: LinkType[] = [
  { to: '/', iconSrc: '/static/images/home.png', name: 'home' },
  { to: '/profile', iconSrc: '/static/images/profile.png', name: 'profile' },
  { to: '/statistics', iconSrc: '/static/images/app.png', name: 'statistics' },
];

export type LinkType = { to: string; iconSrc: string; name: string };
