import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';

import { FlexBetween } from '../layout';
import { IconButton } from '../Button';
import { useGameState } from '../../hooks/useGameState';
import { Group } from './Group';

const Wrapper = styled(FlexBetween)`
  width: 100%;
  padding: 6px 0;
`;

export const Navbar = ({
  location: { pathname },
  match: {
    url,
    params: { gameName = '', location }
  }
}: RouteComponentProps<{ gameName?: string; location?: string }>) => {
  const gameState = useGameState();
  const isGameEnable = gameState.ids.includes(gameName);
  const home = `/${gameName}/${location}`;

  return (
    <Wrapper>
      <Group visible={url === home}>
        <IconButton to={'/'} type={'quit'} />
      </Group>
      <Group visible={isGameEnable}>
        <IconButton navigation to={`${home}`} type={'house'} />
        <IconButton
          disable
          navigation
          to={`${home}/character`}
          type={'player'}
        />
        <IconButton
          disable
          navigation
          to={`${home}/backpack`}
          type={'backpack'}
        />
        <IconButton disable navigation to={`${home}/map`} type={'compass'} />
        <IconButton
          disable
          navigation
          to={`${home}/questbook`}
          type={'questbook'}
        />
        <IconButton
          disable
          navigation
          to={`${home}/adventure`}
          type={'adventure'}
        />
      </Group>
    </Wrapper>
  );
};
