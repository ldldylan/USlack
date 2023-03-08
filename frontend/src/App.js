import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginForm';
import SignupFormPage from './components/SignupFormPage/SignupForm';
import WorkspaceSelection from './components/WorkspaceSelectionPage/WorkspaceSelection';
import Workspace from './components/WorkspacePage/Workspace';
import SplashPage from './components/SplashPage/Splash';
import Channel from './components/ChannelPage/Channel'
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

        <Route path="/clients/:clientId/workspaces/:workspaceId/channels/:channelId">
          <Channel />
        </Route>

        <Route path="/clients/:clientId/workspaces/:workspaceId">
          <Workspace />
        </Route>

        
        <Route path="/workspaces">
          <WorkspaceSelection />
        </Route>

        <Route path="/" exact>  
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;