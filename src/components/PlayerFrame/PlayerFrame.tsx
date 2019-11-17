import React from 'react';
import styled from 'styled-components';

import { Border } from '../layout/Border';
import { BorderInner } from '../layout/BorderInner';
import { StatusBar } from '../StatusBar';
import { Npc } from '../../models/Npc';

const Wrapper = styled(Border)`
  width: 100%;
  flex-shrink: 0;
  margin-top: 3px;
  padding: 6px;
  ${props => props.theme.bg.cssMarble};
`;
const Inner = styled(BorderInner)`
  display: flex;
  border: 1px solid #101110;
  box-shadow: inset 0 1px 14px #151515, 0 0 0 1px #000000;
`;

const Content = styled.div`
  padding: 1px 4px;
  width: 100%;
`;

const HPBar = styled(Border)`
  display: block;
  background-color: darkred;
  min-height: 14px;
  width: 100%;
  box-shadow: inset 0 0 0 rgba(255, 255, 255, 0.36), inset 0 0 5px rgb(0, 0, 0);
  border-radius: 6px;
`;

const Avatar = styled(Border)`
  min-width: 64px;
  height: 64px;
  border-radius: 50%;
  background: url(${props => props.theme.images.guard}) no-repeat center;
  background-size: cover;
`;

interface Interface {
  target?: Npc;
  onTargetDamage?: (damage: number) => void;
}

export const PlayerFrame = ({ target }: Interface) => {
  const [timerId, setTimerId] = React.useState<number>();
  const [autoattack, toggleAutoattack] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (target && !autoattack && target.healthPoints > 0) {
      console.log('Player start attack target: ', target.name);
      setTimeout(() => {
        toggleAutoattack(true);
        console.log('target hp: ', target.healthPoints);
        target.receiveDamage(1);
        console.log('reload autoattack');
      }, 1000);
      // return () => {
      //   if (timerId) {
      //     console.log("Player stops attack target");
      //     clearTimeout(timerId);
      //   }
      // };
    }
    if (target && autoattack) {
      toggleAutoattack(false);
      // const timer = setTimeout(() => {
      //   console.log("target hp: ", target.healthPoints);
      // }, 1000);
      //do damage
      //reset autoattack timer
    }
  }, [target, autoattack]);
  return (
    <Wrapper>
      <Inner>
        <Avatar />
        <Content>
          Player Frame
          <StatusBar value={0.9} />
        </Content>
      </Inner>
    </Wrapper>
  );
};
