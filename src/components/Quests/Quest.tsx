import React, { FC } from 'react';
import styled from 'styled-components';
import { Redirect, useRouteMatch } from 'react-router';

import { Padbox, BorderInner, FlexWide, ScrollArea } from '../layout';

import { Typer } from '../Typer';
import { Button } from '../Button';
import { Divider } from '../layout/Divider';
import { usePlayerContext, usePlayerDispatcher } from '../Player/PlayerContext';
import { getQuestById } from './quests';

const ControlsWrapper = styled(FlexWide)`
  flex-shrink: 0;
  justify-content: space-between;
`;

export const Quest: FC = () => {
  const { params } = useRouteMatch<{
    questId: string;
  }>();
  const player = usePlayerContext();
  const dispatch = usePlayerDispatcher();
  const questId = parseInt(params.questId);

  const onSubmitQuest = () => {
    dispatch({
      type: 'AddQuest',
      questId
    });
  };

  const quest = getQuestById(questId);

  const locationLink =
    player.currentLocationId >= 0
      ? `/${player.name}/locations/${player.currentLocationId}`
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
