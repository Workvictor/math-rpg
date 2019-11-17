import React from 'react';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router';

import {
  Rythm,
  UIBlockInner,
  Padbox,
  Flex,
  ColumnFrame
} from '../../components/layout';

import { Typer } from '../../components/Typer';
import { Button } from '../../components/Button';
import { useGameProvider } from '../../hooks/useGameProvider';
import { useGameState } from '../../hooks/useGameState';
import { getQuestById } from '../../components/Quests/quests';

const Block = Flex.withComponent(
  Rythm.withComponent(Padbox.withComponent(UIBlockInner))
);

const FlexBlock = Flex.withComponent(Padbox.withComponent(UIBlockInner));

const TyperWrapper = styled(Block)`
  align-items: stretch;
  justify-items: stretch;
`;

const ControlsWrapper = styled(FlexBlock)`
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
    <ColumnFrame>
      <TyperWrapper>
        <Typer>{quest.text}</Typer>
      </TyperWrapper>
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
    </ColumnFrame>
  ) : (
    <Redirect to={`/${gameName}`} />
  );
};
