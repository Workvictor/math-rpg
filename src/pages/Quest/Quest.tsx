import React, { FC } from 'react';
import styled from 'styled-components';
import { Redirect, useRouteMatch } from 'react-router';

import {
  Padbox,
  BorderInner,
  FlexWide,
  ScrollArea,
  FlexColumnWide
} from '../../components/layout';

import { Typer } from '../../components/Typer';
import { Button } from '../../components/Button';
import { getQuestById } from '../../components/Quests/quests';
import { Divider } from '../../components/layout/Divider';
import { usePlayerContext } from '../../components/Player/PlayerContext';

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
                <Button to={`/${state.name}`} onClick={onCancelQuest}>
                  Отменить
                </Button>
              </>
            ) : (
              <>
                <Button to={`/${state.name}`}>Отказаться</Button>
                <Button to={`/${state.name}`} onClick={onSubmitQuest}>
                  Принять
                </Button>
              </>
            )}
          </ControlsWrapper>
        </BorderInner>
      </div>
    </Wrapper>
  ) : (
    <Redirect to={`/${state.name}`} />
  );
};
