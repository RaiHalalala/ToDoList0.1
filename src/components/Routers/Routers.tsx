import { Route } from 'react-router-dom';
import { routes } from './data';

//enumeration of routers
const Routers = () => (
  <>
    {routes.map(({ path, Component, name }) => (
      <Route key={name} exact path={path} component={Component} />
    ))}
  </>
);

export default Routers;
