import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';

import { FlexBetween } from '../layout';
import { IconButton } from '../Button';
import { Group } from './Group';
import { useGameContext } from '../Game/GameContext';

const Wrapper = styled(FlexBetween)`
  width: 100%;
  padding: 6px 0;
`;

export const Navbar = ({
  match: {
    url,
    params: { gameName = '', location }
  }
}: RouteComponentProps<{ gameName?: string; location?: string }>) => {
  const { state } = useGameContext();
  const isGameEnable = Boolean(state.players.find(i => i.name === gameName));
  const home = `/${gameName}/${location}`;

  return (
    <Wrapper as={'nav'}>
      <Group visible={url === home}>
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
          type={'player'}
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
          type={'questbook'}
        />
        <IconButton
          soundType={'navigation'}
          disable
          navigation
          to={`${home}/adventure`}
          type={'adventure'}
        />
      </Group>
    </Wrapper>
  );
};
