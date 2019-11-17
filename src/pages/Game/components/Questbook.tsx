import React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { FlexColumnWide, UIBlockInner } from '../../../components/layout';
import { useGameState } from '../../../hooks/useGameState';
import { getQuestById, quests } from '../../../store/quests';
import { TabLabel } from '../../../components/TabLabel';

export const Questbook = (
  props: RouteComponentProps<{ gameName: string; location: string }>
) => {
  const {
    match: {
      url,
      params: { gameName, location }
    }
  } = props;
  const gameState = useGameState();
  const fromUrl = ['', gameName, location].join('/');

  const to = url
    .split('/')
    .slice(0, -1)
    .join('/');

  return (
    <FlexColumnWide>
      <TabLabel label={'Questbook'} fromUrl={fromUrl} />

      <div>
        {gameState.game[gameName].questbook.map((questId, index) => {
          const quest = getQuestById(questId);

          return quest ? (
            <Link key={questId} to={[to, 'quest', questId].join('/')}>
              <UIBlockInner>
                {index + 1}. {quest.name}
              </UIBlockInner>
            </Link>
          ) : null;
        })}
      </div>
    </FlexColumnWide>
  );
};
