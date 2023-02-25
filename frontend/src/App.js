import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage/SignupForm";
import Navigation from "./components/Navigation/Navigation";
function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;