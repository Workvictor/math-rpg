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
  const {
    state: { players }
  } = useGameContext();
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
          {players.length < 3 && (
            <StyledButton to={'/newgame'}>Новая игра</StyledButton>
          )}
          <StyledButton disable>Помощь</StyledButton>
          <StyledButton disable>Авторы</StyledButton>
        </Menu>
        <Divider />
        {players.length > 0 && <Rythm r={2}>Недавние игры:</Rythm>}
        {players.map(({ name, level }) => (
          <Rythm r={2} key={name}>
            <UIBlockInner>
              {name}
              <div>уровень - {level}</div>
              <Menu>
                <StyledButton to={`/${name}`}>Продолжить</StyledButton>
              </Menu>
            </UIBlockInner>
          </Rythm>
        ))}
      </ScrollArea>
    </Wrapper>
  );
};
