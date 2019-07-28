import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { MainScreen } from "./MainScreen";
import { MapPage } from "./components/MapPage";
import { BorderInner } from "./components/Border";
import { theme } from "./theme";
import { AppGlobalStyle } from "./theme/theme";

const Wrapper = styled.div`
  height: 100%;
  max-width: 425px;
  position: relative;
  margin: 0 auto;
  box-shadow: ${props => props.theme.shadows.blueGlow};
  padding: 14px;
  background: url(${props => props.theme.images.marble});
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <AppGlobalStyle />
        <BorderInner>
          <BrowserRouter>
            <Switch>
              <Route exact path={"/"} component={MainScreen} />
              <Route path={"/map"} component={MapPage} />
            </Switch>
          </BrowserRouter>
        </BorderInner>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
