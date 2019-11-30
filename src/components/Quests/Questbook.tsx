import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

import { getQuestById } from './quests';
import { UIBlockInner } from '../layout';
import { TabLabel } from '../TabLabel';
import { usePlayerContext } from '../Player/PlayerContext';

export const Questbook = () => {
  const { url } = useRouteMatch<{ gameName: string; locationName: string }>();
  const { state } = usePlayerContext();

  const to = url
    .split('/')
    .slice(0, -1)
    .join('/');

  return (
    <>
      <TabLabel label={'Questbook'} />

      <div>
        {state.questbook.map((questId, index) => {
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
    </>
  );
};
