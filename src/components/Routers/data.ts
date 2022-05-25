import Main from 'components/Pages/Boards';
import Task from 'components/Pages/Tasks';
import Statistics from 'components/Pages/Statistics';
import Profile from 'components/Pages/Profile';

export const routes = [
  { path: '/', Component: Main, name: 'Main' },
  { path: '/:id', Component: Task, name: 'Task' },
  { path: '/statistics', Component: Statistics, name: 'Statistics' },
  { path: '/profile', Component: Profile, name: 'Profile' },
];
