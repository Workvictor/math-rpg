import React from 'react';
import styled from 'styled-components';

import {
  Border,
  Rythm,
  FullWidth,
  UIBlockInner,
  BorderInner,
  ScrollArea,
  FlexColumnWide,
  Padbox
} from '../../components/layout';

import bg1 from './img/bg1.jpg';
import { Button } from '../../components/Button';
import { useGameState } from '../../hooks/useGameState';
import { Divider } from '../../components/layout/Divider';

const Header = styled(Border.withComponent(FullWidth).withComponent(Rythm))`
  height: 250px;
  background-image: url(${bg1});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 30px #000, inset 0 0 10px #000, inset 0 0 20px #000;
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
  const gameState = useGameState();
  return (
    <Wrapper>
      <BorderInner>
        <Header />
      </BorderInner>
      <BorderInner>
        <Padbox>Добро пожаловать!</Padbox>
      </BorderInner>
      <Divider />
      <ScrollArea>
        <Menu>
          {gameState.ids.length > 0 && (
            <StyledButton to={`/${gameState.ids[0]}`}>Продолжить</StyledButton>
          )}
          {gameState.ids.length < 3 && (
            <StyledButton to={'/newgame'}>Новая игра</StyledButton>
          )}
          <StyledButton disable>Помощь</StyledButton>
          <StyledButton disable>Авторы</StyledButton>
        </Menu>
      </ScrollArea>
    </Wrapper>
  );
};
