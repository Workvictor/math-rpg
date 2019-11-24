import React from 'react';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router';

import {
  Padbox,
  BorderInner,
  FlexWide,
  ScrollArea,
  FlexColumnWide
} from '../../components/layout';

import { Typer } from '../../components/Typer';
import { Button } from '../../components/Button';
import { useGameProvider } from '../../components/Game';
import { getQuestById } from '../../components/Quests/quests';
import { Divider } from '../../components/layout/Divider';

const Wrapper = styled(FlexColumnWide)`
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
`;

const ControlsWrapper = styled(FlexWide)`
  flex-shrink: 0;
  justify-content: space-between;
`;

export const Quest: React.FC<RouteComponentProps<{
  id: string;
  gameName: string;
}>> = ({
  match: {
    params: { id, gameName }
  }
}) => {
  const { addQuest, removeQuest, state } = useGameProvider();

  const onSubmitQuest = () => {
    addQuest(gameName, id);
  };

  const onCancelQuest = () => {
    removeQuest(gameName, id);
  };

  const quest = getQuestById(id);

  return id && quest ? (
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
            {state.game[gameName].questbook.includes(id) ? (
              <>
                <Button to={`/${gameName}`} onClick={onCancelQuest}>
                  Отменить
                </Button>
              </>
            ) : (
              <>
                <Button to={`/${gameName}`}>Отказаться</Button>
                <Button to={`/${gameName}`} onClick={onSubmitQuest}>
                  Принять
                </Button>
              </>
            )}
          </ControlsWrapper>
        </BorderInner>
      </div>
    </Wrapper>
  ) : (
    <Redirect to={`/${gameName}`} />
  );
};
