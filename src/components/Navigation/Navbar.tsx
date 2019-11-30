import React from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router';

import { BorderInner, Flex } from '../layout';
import { IconButton } from '../Button';
import { useGameContext } from '../Game/GameContext';

const Wrapper = styled(Flex.withComponent(BorderInner))`
  border-bottom: none;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 18px;
  z-index: 1;
  padding: 4px 0 0 4px;
  justify-content: flex-end;
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
      <IconButton soundType={'navigation'} to={'/'} type={'hamburgerMenu'} />
      {/*<Group visible={isGameEnable}>*/}
      {/*  <IconButton*/}
      {/*    soundType={'navigation'}*/}
      {/*    disable*/}
      {/*    navigation*/}
      {/*    to={`${home}/player`}*/}
      {/*    type={'cementShoes'}*/}
      {/*  />*/}
      {/*  <IconButton*/}
      {/*    soundType={'navigation'}*/}
      {/*    disable*/}
      {/*    navigation*/}
      {/*    to={`${home}/locations`}*/}
      {/*    type={'compass'}*/}
      {/*  />*/}
      {/*  <IconButton*/}
      {/*    soundType={'navigation'}*/}
      {/*    disable*/}
      {/*    navigation*/}
      {/*    to={`${home}/quests`}*/}
      {/*    type={'bookmark'}*/}
      {/*  />*/}
      {/*  <IconButton*/}
      {/*    soundType={'navigation'}*/}
      {/*    disable*/}
      {/*    navigation*/}
      {/*    to={`${home}/adventure`}*/}
      {/*    type={'slalom'}*/}
      {/*  />*/}
      {/*</Group>*/}
    </Wrapper>
  );
};
