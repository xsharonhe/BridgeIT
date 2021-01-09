import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { baseTheme } from "./theme/theme";
import { GlobalStyle } from "./theme/GlobalStyle";

import Home from './scenes/Home';

const App = () => {
  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={baseTheme}>
        <GlobalStyle />
        {routes}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
