import React from "react";
import SignUp from "./components/pages/SignUp";
import Layout from "./components/Layout/Layout";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Home from "./components/pages/Home";
import CompleteProfile from "./components/pages/CompleteProfile";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/completeProfile">
          <CompleteProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
