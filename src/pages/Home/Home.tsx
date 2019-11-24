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
  Padbox,
  Flex
} from '../../components/layout';

import bg1 from './img/bg1.jpg';
import { Button } from '../../components/Button';
import { Divider } from '../../components/layout/Divider';
import { useGameProvider } from '../../components/Game';

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
  const { state } = useGameProvider();
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
          {state.ids.length < 3 && (
            <StyledButton to={'/newgame'}>Новая игра</StyledButton>
          )}
          <StyledButton disable>Помощь</StyledButton>
          <StyledButton disable>Авторы</StyledButton>
        </Menu>
        <Divider />
        {state.ids.length > 0 && <Rythm r={2}>Недавние игры:</Rythm>}
        {state.ids.map(gameName => (
          <Rythm r={2} key={gameName}>
            <UIBlockInner>
              {gameName}
              <div>уровень - {state.game[gameName].level}</div>
              <Menu>
                <StyledButton to={`/${state.ids[0]}`}>Продолжить</StyledButton>
              </Menu>
            </UIBlockInner>
          </Rythm>
        ))}
      </ScrollArea>
    </Wrapper>
  );
};
