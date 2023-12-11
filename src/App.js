import React from "react";
import SignUp from "./components/pages/SignUp";
import Layout from "./components/Layout/Layout";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Home from "./components/pages/Home";
import CompleteProfile from "./components/pages/CompleteProfile";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to='/login' />
        </Route>
        {token && <Route path="/home">
          <Home />
        </Route>}
        {!token && (
          <Route path="/login">
            <SignUp />
          </Route>
        )}
        <Route path="/completeProfile">
          <CompleteProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
