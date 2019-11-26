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
import {
  useGameContext,
  useGameDispatcher
} from '../../components/Game/GameContext';

const Header = styled(Border)`
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${props => props.theme.shadows.header}
`;

export const newGamePath = 'newgame';

export const NewGame = () => {
  const { ids } = useGameContext();
  const { dispatch } = useGameDispatcher();
  const [name, setName] = React.useState<string>('');

  const onStartNewGame = () => {
    dispatch({
      type: 'startNewGame',
      payload: {
        name
      }
    });
  };

  const validName = name.length >= 3 && !ids.includes(name);

  return ids.length < 3 ? (
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
              to={`/${name}/quest/1`}
              onClick={onStartNewGame}
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
