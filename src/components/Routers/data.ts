import Boards from 'components/Pages/Boards';
import Task from 'components/Pages/Tasks';
import Statistics from 'components/Pages/Statistics';
import Profile from 'components/Pages/Profile';

export const routes = [
  { path: '/boards', Component: Boards, name: 'Boards' },
  { path: '/boards/:id', Component: Task, name: 'Task' },
  { path: '/statistics', Component: Statistics, name: 'Statistics' },
  { path: '/profile', Component: Profile, name: 'Profile' },
];
