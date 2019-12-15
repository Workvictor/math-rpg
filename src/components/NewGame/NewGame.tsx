import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';

import { Flex, ScrollArea, BorderInner, Padbox } from '../layout';
import { Input } from '../Input';
import { Button } from '../Button';
import { Typography } from '../layout/Typography';
import { Divider } from '../layout/Divider';
import { useGameContext, useGameDispatcher } from '../Game/GameContext';
import { TabLabel } from '../TabLabel';

export const newGamePath = 'newgame';

export const NewGame = () => {
  const [gameNameSubmitted, submitGameName] = useState(false);

  const [name, setName] = React.useState('');

  const [nameIsValid, setNameIsValid] = React.useState(false);

  const { players } = useGameContext();

  const dispatch = useGameDispatcher();

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
