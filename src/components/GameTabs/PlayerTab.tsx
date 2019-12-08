import React from 'react';
import { useRouteMatch } from 'react-router';

import { TabLabel } from '../TabLabel';
import { Button } from '../Button';
import { usePlayerContext } from '../Player/PlayerContext';
import { IGameRoute } from '../Game/IGameRoute';

export const PlayerTab = () => {
  const { params } = useRouteMatch<IGameRoute>();
  const { state } = usePlayerContext();
  return (
    <TabLabel label={'Информация'}>
      <Button to={`/${params.gameName}/locations/${state.location}`}>
        назад
      </Button>
    </TabLabel>
  );
};
