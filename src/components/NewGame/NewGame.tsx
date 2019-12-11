import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router';

import { Border, Flex, ScrollArea, BorderInner, Padbox } from '../layout';
import { Input } from '../Input';
import { Button } from '../Button';
import { Typography } from '../layout/Typography';
import { Divider } from '../layout/Divider';
import { useGameContext } from '../Game/GameContext';
import { TabLabel } from '../TabLabel';

const Header = styled(Border)`
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${props => props.theme.shadows.header}
`;

export const newGamePath = 'newgame';

export const NewGame = () => {
  const [gameNameSubmitted, submitGameName] = useState(false);

  const [name, setName] = React.useState('');

  const [nameIsValid, setNameIsValid] = React.useState(false);

  const {
    state: { players },
    dispatch
  } = useGameContext();

  const history = useHistory();

  const onSubmitGameName = () => {
    submitGameName(true);
    dispatch({
      type: 'startNewGame',
      name
    });
  };

  useEffect(() => {
    setNameIsValid(
      name !== 'newgame' &&
        name.length >= 3 &&
        !players.find(i => i.name === name)
    );
  }, [name, players]);

  useEffect(() => {
    if (gameNameSubmitted && nameIsValid) {
      history.push(`/${name}/quests/0`);
    }
  }, [gameNameSubmitted, history, name, nameIsValid]);

  return players.length < 3 ? (
    <>
      <TabLabel label={'Новая игра'} />
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
              <Input
                regExpReplacer={/\W+|\d/}
                value={name}
                onChange={setName}
              />
            </label>
            <Button disable={!nameIsValid} onClick={onSubmitGameName}>
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
