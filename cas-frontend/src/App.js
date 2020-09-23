import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { Home } from './pages/Home';
import { MyProfile } from './pages/MyProfile';
import { AccessWindow } from './pages/Access';
import { NewProfile } from './pages/NewProfile';
import { Profile } from './pages/Profile';
import { User } from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/access">
            <AccessWindow />
          </Route>
          <Route path="/my-projects/:userId">
            <MyProjects />
          </Route>
          <Route path="/my-profile">
            <MyProfile />
          </Route>
          <Route path="/new-profile">
            <NewProject />
          </Route>
          <Route path="/project/:translatorId">
            <Project />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
