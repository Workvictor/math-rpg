import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';

import { Border, Flex, ScrollArea, BorderInner, Padbox } from '../layout';
import { Input } from '../Input';
import { Button } from '../Button';
import { Typography } from '../layout/Typography';
import { Divider } from '../layout/Divider';
import { useGameContext } from '../Game/GameContext';

const Header = styled(Border)`
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${props => props.theme.shadows.header}
`;

export const newGamePath = 'newgame';

export const NewGame = () => {
  const {
    state: { players },
    dispatch
  } = useGameContext();
  const [name, setName] = React.useState('');

  const onStartNewGame = () => {
    dispatch({
      type: 'startNewGame',
      name
    });
  };

  const validName =
    name !== 'newgame' &&
    name.length >= 3 &&
    !players.find(i => i.name === name);

  return players.length < 3 ? (
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
              to={`/${name}/quests/1`}
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
