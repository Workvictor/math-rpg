import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme, AppGlobalStyle } from './theme';
import { Game } from './components/Game';
import { Home } from './components/Home';
import { NewGame } from './components/NewGame';
import { GameProvider } from './components/Game/GameContext';
import { AppFrame } from './components/AppFrame';
import { Credits } from './components/Credits';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppGlobalStyle />
        <ThemeProvider theme={theme}>
          <AppFrame>
            <Switch>
              <Route exact path={'/menu'} component={Home} />
              <Route exact path={'/credits'}>
                <Credits />
              </Route>
              <Route exact path={'/newgame'} component={NewGame} />
              <Route path={'/:gameName'} component={Game} />
              <Redirect to={'/menu'} />
            </Switch>
          </AppFrame>
        </ThemeProvider>
      </GameProvider>
    </BrowserRouter>
  );
};
