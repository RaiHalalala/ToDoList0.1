import React, { useEffect } from 'react';
import { Switch, useLocation, useHistory } from 'react-router-dom';
import { useInitialApp } from 'hooks/useInitialApp';
//Components
import WrapperEmotion from 'components/WrapperEmotion';
import Layout from 'components/Layout';
import Routers from 'components/Routers';

const App = () => {
  useInitialApp();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/boards');
    }
  }, []);
  return (
    <WrapperEmotion>
      <Layout>
        <Switch>
          <Routers />
        </Switch>
      </Layout>
    </WrapperEmotion>
  );
};

export default App;
