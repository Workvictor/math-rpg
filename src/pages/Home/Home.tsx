import React from 'react';
import styled from 'styled-components';

import {
  Border,
  Rythm,
  UIBlockInner,
  BorderInner,
  ScrollArea,
  FlexColumnWide,
  Padbox
} from '../../components/layout';

import bg1 from './img/bg1.jpg';
import { Button } from '../../components/Button';
import { Divider } from '../../components/layout/Divider';
import { useGameContext } from '../../components/Game/GameContext';

const Header = styled(Border)`
  height: 250px;
  background-image: url(${bg1});
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
  const { ids, game } = useGameContext();
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
          {ids.length < 3 && (
            <StyledButton to={'/newgame'}>Новая игра</StyledButton>
          )}
          <StyledButton disable>Помощь</StyledButton>
          <StyledButton disable>Авторы</StyledButton>
        </Menu>
        <Divider />
        {ids.length > 0 && <Rythm r={2}>Недавние игры:</Rythm>}
        {ids.map(gameName => (
          <Rythm r={2} key={gameName}>
            <UIBlockInner>
              {gameName}
              <div>уровень - {game[gameName].level}</div>
              <Menu>
                <StyledButton to={`/${ids[0]}`}>Продолжить</StyledButton>
              </Menu>
            </UIBlockInner>
          </Rythm>
        ))}
      </ScrollArea>
    </Wrapper>
  );
};
