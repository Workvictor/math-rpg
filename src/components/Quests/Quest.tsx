import React, { FC } from 'react';
import styled from 'styled-components';
import { Redirect, useRouteMatch } from 'react-router';

import {
  Padbox,
  BorderInner,
  FlexWide,
  ScrollArea,
  FlexColumnWide
} from '../layout';

import { Typer } from '../Typer';
import { Button } from '../Button';
import { Divider } from '../layout/Divider';
import { usePlayerContext } from '../Player/PlayerContext';
import { getQuestById, IQuest } from './quests';
import { locations } from '../world/world';

const Wrapper = styled(FlexColumnWide)`
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
`;

const ControlsWrapper = styled(FlexWide)`
  flex-shrink: 0;
  justify-content: space-between;
`;

export const Quest: FC = () => {
  const { params } = useRouteMatch<{
    questId: string;
  }>();
  const { dispatch, state: player } = usePlayerContext();
  const questId = parseInt(params.questId);

  const onSubmitQuest = () => {
    dispatch({
      type: 'addQuest',
      questId
    });
  };

  const quest = getQuestById(questId);

  const locationLink =
    player.location >= 0
      ? `/${player.name}/locations/${player.location}/${
          locations[player.location].rooms[0].name
        }`
      : `/${player.name}/locations`;

  return quest ? (
    <>
      <BorderInner>
        <ControlsWrapper>
          <Button to={locationLink} onClick={onSubmitQuest}>
            далее
          </Button>
        </ControlsWrapper>
      </BorderInner>
      <Divider />
      <ScrollArea>
        <Padbox>
          <Typer>{quest.text}</Typer>
        </Padbox>
      </ScrollArea>
    </>
  ) : (
    <Redirect to={locationLink} />
  );
};
