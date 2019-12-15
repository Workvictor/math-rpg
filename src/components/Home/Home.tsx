import React from 'react';
import styled from 'styled-components';

import {
  Border,
  Rythm,
  BorderInner,
  ScrollArea,
  FlexColumnWide,
  Padbox
} from '../layout';

import { Button } from '../Button';
import { Divider } from '../layout/Divider';
import { useGameContext } from '../Game/GameContext';
import { PlayerSelectFrame } from '../PlayerSelectFrame';

const Header = styled(Border)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${props => props.theme.shadows.header};
`;

const Wrapper = styled(FlexColumnWide)`
  text-align: center;
  align-items: stretch;
  height: 100%;
`;

const StyledButton = styled(Button)`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Menu = styled(FlexColumnWide)`
  max-width: 120px;
  align-items: stretch;
  margin: 16px auto;
`;

export const Home = () => {
  const { players } = useGameContext();
  return (
    <Wrapper>
      <BorderInner>
        <Header>
          <Padbox>Добро пожаловать!</Padbox>
        </Header>
      </BorderInner>
      <Divider />
      <ScrollArea>
        <Menu>
          {players.length < 3 && (
            <StyledButton to={'/newgame'}>Новая игра</StyledButton>
          )}
          <StyledButton disable to={'/help'}>
            Помощь
          </StyledButton>
          <StyledButton to={'/credits'}>Авторы</StyledButton>
        </Menu>
        <Divider />
        {players.length > 0 && <Rythm r={2}>Недавние игры:</Rythm>}
        {players.map(player => (
          <PlayerSelectFrame key={player.name} player={player} />
        ))}
      </ScrollArea>
    </Wrapper>
  );
};
