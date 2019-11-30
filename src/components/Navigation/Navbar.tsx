import React from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router';

import { FlexBetween } from '../layout';
import { IconButton } from '../Button';
import { Group } from './Group';
import { useGameContext } from '../Game/GameContext';

const Wrapper = styled(FlexBetween)`
  width: 100%;
  padding: 6px 0;
`;

export const Navbar = () => {
  const {
    params: { gameName = '', location }
  } = useRouteMatch<{ gameName: string; location?: string }>();
  const { state } = useGameContext();
  const isGameEnable = Boolean(state.players.find(i => i.name === gameName));
  const home = `/${gameName}/${location}`;

  return (
    <Wrapper as={'nav'}>
      <Group>
        <IconButton soundType={'navigation'} to={'/'} type={'quit'} />
      </Group>
      <Group visible={isGameEnable}>
        <IconButton
          soundType={'navigation'}
          navigation
          to={`${home}`}
          type={'house'}
        />
        <IconButton
          soundType={'navigation'}
          disable
          navigation
          to={`${home}/character`}
          type={'cementShoes'}
        />
        <IconButton
          soundType={'navigation'}
          disable
          navigation
          to={`${home}/backpack`}
          type={'backpack'}
        />
        <IconButton
          soundType={'navigation'}
          disable
          navigation
          to={`${home}/map`}
          type={'compass'}
        />
        <IconButton
          soundType={'navigation'}
          disable
          navigation
          to={`${home}/questbook`}
          type={'bookmark'}
        />
        <IconButton
          soundType={'navigation'}
          disable
          navigation
          to={`${home}/adventure`}
          type={'slalom'}
        />
      </Group>
    </Wrapper>
  );
};
