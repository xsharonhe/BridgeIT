import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { baseTheme } from "./theme/theme";
import { GlobalStyle } from "./theme/GlobalStyle";
import { Provider } from "react-redux";
import store from "./store/store";

import Layout from "./components/Layout/Layout";
import Home from "./scenes/Home";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import Dashboard from "./scenes/Dashboard";

const App = () => {
  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={baseTheme}>
        <GlobalStyle />
        <Provider store={store}>
          <Layout>{routes}</Layout>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
