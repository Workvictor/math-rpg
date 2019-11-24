import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';

import {
  Border,
  Rythm,
  FullWidth,
  UIBlockInner,
  Flex,
  ScrollArea,
  BorderInner,
  Padbox
} from '../../components/layout';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Typography } from '../../components/layout/Typography';
import { useGameProvider } from '../../components/Game';
import { Divider } from '../../components/layout/Divider';

const Header = styled(Border.withComponent(FullWidth).withComponent(Rythm))`
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 30px #000, inset 0 0 10px #000, inset 0 0 20px #000;
`;

export const newGamePath = 'newgame';

export const NewGame = () => {
  const { startNewGame, state } = useGameProvider();
  const [name, setName] = React.useState<string>('');

  const onStartNewGame = () => {
    startNewGame(name);
  };

  const validName = name.length >= 3 && !state.ids.includes(name);

  return state.ids.length < 3 ? (
    <>
      <BorderInner>
        <Header />
      </BorderInner>
      <BorderInner>
        <Padbox>
          <Typography>
            <h1>Создание персонажа</h1>
          </Typography>
        </Padbox>
      </BorderInner>
      <Divider />
      <ScrollArea>
        <Padbox>
          <Flex>
            <label>
              Имя:
              <Input value={name} onChange={setName} />
            </label>
            <Button
              disable={!validName}
              to={validName ? `/${name}/quest/1` : undefined}
              onClick={validName ? onStartNewGame : undefined}
            >
              Далее
            </Button>
          </Flex>
        </Padbox>
      </ScrollArea>
    </>
  ) : (
    <Redirect to={'/'} />
  );
};
