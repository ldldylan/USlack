import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginForm';
import SignupFormPage from './components/SignupFormPage/SignupForm';
import Workspace from './components/WorkspacePage/Workspace';
import Channel from './components/ChannelPage/Channel';
import SplashPage from './components/SplashPage/Splash';

function App() {
  return (
    <>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/clients/:clientId/workspaces/:workspaceId">
          <Channel />
        </Route>
        {/* <Route>
          <Route path="/clients/:clientId/workspaces/:workspaceId"
        </Route> */}
        <Route path="/workspaces">
          <Workspace />
        </Route>
        <Route path="/" exact>  
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;