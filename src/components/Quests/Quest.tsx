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
import { getQuestById } from './quests';
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
  const { dispatch, state } = usePlayerContext();
  const questId = parseInt(params.questId);

  const onSubmitQuest = () => {
    dispatch({
      type: 'addQuest',
      questId
    });
  };

  const onCancelQuest = () => {
    dispatch({
      type: 'removeQuest',
      questId
    });
  };

  const quest = getQuestById(questId);
  const playerLocation = locations[state.location];

  const locationLink = playerLocation
    ? `/${state.name}/locations/${playerLocation.name}`
    : `/${state.name}/locations`;

  return questId && quest ? (
    <Wrapper>
      <ScrollArea>
        <Padbox>
          <Typer>{quest.text}</Typer>
        </Padbox>
      </ScrollArea>
      <div>
        <Divider />
        <BorderInner>
          <ControlsWrapper>
            {state.questbook.includes(questId) ? (
              <>
                <Button to={locationLink} onClick={onCancelQuest}>
                  Отменить
                </Button>
              </>
            ) : (
              <>
                <Button to={locationLink}>Отказаться</Button>
                <Button to={locationLink} onClick={onSubmitQuest}>
                  Принять
                </Button>
              </>
            )}
          </ControlsWrapper>
        </BorderInner>
      </div>
    </Wrapper>
  ) : (
    <Redirect to={locationLink} />
  );
};
