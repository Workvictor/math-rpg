import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';

import { Padbox, FlexBetween } from '../layout';
import { IconButton } from '../Button';
import { useGameState } from '../../hooks/useGameState';
import { Group } from './Group';

const Wrapper = styled(Padbox.withComponent(FlexBetween))`
  width: 100%;
`;

export const Navbar = ({
  location: { pathname },
  match: {
    url,
    params: { gameName = '' }
  }
}: RouteComponentProps<{ gameName?: string; location?: string }>) => {
  const gameState = useGameState();
  const isGameEnable = gameState.ids.includes(gameName);
  const homeBtnVisible = pathname.split('/').filter(String).length > 0;

  return (
    <Wrapper>
      <Group visible={homeBtnVisible}>
        <IconButton to={'/'} type={'quit'} />
      </Group>
      <Group visible={isGameEnable}>
        <IconButton navigation to={`${url}/character`} type={'player'} />
        <IconButton navigation to={`${url}/backpack`} type={'backpack'} />
        <IconButton navigation to={`${url}/map`} type={'compass'} />
        <IconButton navigation to={`${url}/questbook`} type={'questbook'} />
        <IconButton navigation to={`${url}/inn`} type={'house'} />
        <IconButton navigation to={`${url}/adventure`} type={'adventure'} />
      </Group>
    </Wrapper>
  );
};
