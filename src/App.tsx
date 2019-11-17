import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme, AppGlobalStyle } from './theme';
import { Navbar } from './components/Navigation/Navbar';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { NewGame } from './pages/NewGame';
import { GameProvider } from './store/GameContext';
import { AppFrame } from './components/AppFrame';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppGlobalStyle />
        <ThemeProvider theme={theme}>
          <AppFrame
            header={
              <Route path={'/:gameName?/:location?'} component={Navbar} />
            }
          >
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route path={'/newgame'} component={NewGame} />
              <Route path={'/:gameName'} component={Game} />
              <Redirect to={'/'} />
            </Switch>
          </AppFrame>
        </ThemeProvider>
      </GameProvider>
    </BrowserRouter>
  );
};
