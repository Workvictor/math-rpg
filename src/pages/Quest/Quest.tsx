import React from 'react';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router';

import {
  Rythm,
  UIBlockInner,
  Padbox,
  Flex,
  ColumnFrame,
  BorderInner,
  FlexWide,
  ScrollArea,
  FlexColumnWide
} from '../../components/layout';

import { Typer } from '../../components/Typer';
import { Button } from '../../components/Button';
import { useGameProvider } from '../../hooks/useGameProvider';
import { useGameState } from '../../hooks/useGameState';
import { getQuestById } from '../../components/Quests/quests';
import { Divider } from '../../components/layout/Divider';

const Block = Flex.withComponent(
  Rythm.withComponent(Padbox.withComponent(UIBlockInner))
);

const FlexBlock = Flex.withComponent(Padbox.withComponent(UIBlockInner));

const Wrapper = styled(FlexColumnWide)`
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
`;

const ControlsWrapper = styled(FlexWide)`
  flex-shrink: 0;
  justify-content: space-between;
`;

export const Quest: React.FC<
  RouteComponentProps<{
    id: string;
    gameName: string;
  }>
> = ({
  match: {
    params: { id, gameName }
  }
}) => {
  const gameState = useGameState();
  const { addQuest, removeQuest } = useGameProvider();

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
            {gameState.game[gameName].questbook.includes(id) ? (
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
