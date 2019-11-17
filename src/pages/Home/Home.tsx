import React from 'react';
import styled from 'styled-components';

import {
  Border,
  Rythm,
  FullWidth,
  UIBlockInner
} from '../../components/layout';

import bg1 from './img/bg1.jpg';
import { Button } from '../../components/Button';
import { useGameState } from '../../hooks/useGameState';

const Header = styled(Border.withComponent(FullWidth).withComponent(Rythm))`
  height: 250px;
  background-image: url(${bg1});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 30px #000, inset 0 0 10px #000, inset 0 0 20px #000;
`;

const Block = styled(Rythm.withComponent(UIBlockInner))`
  text-align: center;
  padding: 16px;
`;

export const Home = () => {
  const gameState = useGameState();
  return (
    <>
      <Header />
      <Block>Добро пожаловать!</Block>
      {gameState.ids.length > 0 && (
        <Block>
          <Button to={`/${gameState.ids[0]}`}>Продолжить</Button>
        </Block>
      )}
      {gameState.ids.length < 3 && (
        <Block>
          <Button to={'/newgame'}>Новая игра</Button>
        </Block>
      )}
    </>
  );
};
