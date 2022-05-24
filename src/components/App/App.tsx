import React from 'react';
import { Switch } from 'react-router-dom';
import { useInitialApp } from 'hooks/useInitialApp';
//Components
import WrapperEmotion from 'components/WrapperEmotion';
import Layout from 'components/Layout';
import { Routers } from 'routes';

const App = () => {
  useInitialApp();
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
