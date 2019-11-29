import React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { getQuestById } from './quests';
import { UIBlockInner } from '../layout';
import { TabLabel } from '../TabLabel';
import { usePlayerContext } from '../Player/PlayerContext';

export const Questbook = (
  props: RouteComponentProps<{ gameName: string; location: string }>
) => {
  const {
    match: {
      url,
      params: { gameName, location }
    }
  } = props;
  const { state } = usePlayerContext();
  const fromUrl = ['', gameName, location].join('/');

  const to = url
    .split('/')
    .slice(0, -1)
    .join('/');

  return (
    <>
      <TabLabel label={'Questbook'} fromUrl={fromUrl} />

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
