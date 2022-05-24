import { Route } from 'react-router-dom';
import { routes } from './data';

export const Routers = () => (
  <>
    {routes.map(({ path, Component, name }) => (
      <Route key={name} exact path={path} component={Component} />
    ))}
  </>
);
