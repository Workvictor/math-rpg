import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { MainScreen } from "./MainScreen";
import { MapPage } from "./components/MapPage";
import { BorderInner } from "./components/layout/BorderInner";
import { theme, AppGlobalStyle } from "./theme";
import { SpotPage } from "./components/SpotPage";
import { Navbar } from "./components/Navigation/Navbar";
import { Padbox } from "./components/layout";

const Wrapper = styled(Padbox)`
  height: 100%;
  max-height: 812px;
  max-width: 425px;
  position: relative;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 8px;
  ${props => props.theme.shadows.cssBlueGlow};
  ${props => props.theme.bg.cssMarble}
`;

const StyledInner = styled(BorderInner)`
  overflow: hidden;
  overflow-y: auto;
  height: 100%;
`;

const App: React.FC = () => {
  return (
    <>
      <AppGlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Navbar />
          <StyledInner>
            <BrowserRouter>
              <Switch>
                <Route exact path={"/"} component={MainScreen} />
                {/*<Route path={"/map/:id"} component={SpotPage} />*/}
                {/*<Route path={"/map"} component={MapPage} />*/}
              </Switch>
            </BrowserRouter>
          </StyledInner>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
