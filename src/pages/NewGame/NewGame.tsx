import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';

import {
  Border,
  Rythm,
  FullWidth,
  UIBlockInner
} from '../../components/layout';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Typography } from '../../components/layout/Typography';
import { useGameState } from '../../hooks/useGameState';
import { useGameProvider } from '../../hooks/useGameProvider';

const Header = styled(Border.withComponent(FullWidth).withComponent(Rythm))`
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 30px #000, inset 0 0 10px #000, inset 0 0 20px #000;
`;

const Block = styled(UIBlockInner)`
  padding: 16px;
  display: flex;
`;

export const newGamePath = 'newgame';

export const NewGame = () => {
  const gameState = useGameState();
  const { startNewGame } = useGameProvider();
  const [name, setName] = React.useState<string>('');

  const onStartNewGame = () => {
    startNewGame(name);
  };

  return gameState.ids.length < 3 ? (
    <>
      <Header />
      <div>
        <Typography>
          <h1>Создание персонажа</h1>
        </Typography>
        <Block>
          <div>
            <label>
              Имя:
              <Input value={name} onChange={setName} />
            </label>
          </div>
          <div>
            {name.length >= 3 && !gameState.ids.includes(name) && (
              <Button to={`/${name}/quest/1`} onClick={onStartNewGame}>
                Далее
              </Button>
            )}
          </div>
        </Block>
      </div>
    </>
  ) : (
    <Redirect to={'/'} />
  );
};
