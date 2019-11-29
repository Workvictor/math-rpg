import React from 'react';
import { Redirect, RouteComponentProps, useRouteMatch } from 'react-router';
// import { Howl } from 'howler';

import { TabLabel } from '../TabLabel';
import { rooms, ETowns, locations } from '../Game/world';
import {
  UIBlockInner,
  Padbox,
  Flex,
  ScrollArea,
  BorderInner,
  Rythm,
  Border
} from '../layout';
import { Character } from '../Character';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import styled from 'styled-components';
import { SvgIcon } from '../icons';
import { HealButton } from '../HealButton';
import { ButtonGroup } from '../Button/ButtonGroup';

// const sounds = [
//   new Howl({
//     src: ['music/Path to Lake Land.mp3'],
//     volume: 0.05
//   }),
//   new Howl({
//     src: ['music/Dark_Rainy_Night(ambience).ogg'],
//     volume: 0.25
//   })
// ];

const LocWrapper = styled(UIBlockInner)`
  color: ${props => props.theme.colors.blueDark};
`;

const Avatar = styled(Border)`
  font-size: 32px;
  flex-shrink: 0;
  display: flex;
  color: ${props => props.theme.colors.grey60};
`;

export const Town = () => {
  const {
    params: { townId, gameName }
  } = useRouteMatch<{
    gameName: string;
    townId: ETowns;
    tab: string;
  }>();

  const town = locations.find(({ id }) => id === townId);

  return town ? (
    <>
      <BorderInner>
        <TabLabel label={town.name} />

        <Character />
        <Padbox>
          <div>Действия:</div>
          <ButtonGroup>
            <HealButton />
            <Button disable>чинить(300)</Button>
            <Button disable>отдых(1000)</Button>
          </ButtonGroup>
        </Padbox>
      </BorderInner>
      <Divider />
      <ScrollArea>
        <Padbox>Локации:</Padbox>
        {town.roomIds.map(locationId => {
          const loc = rooms.find(item => item.id === locationId);
          return loc ? (
            <Rythm r={2} key={locationId}>
              <LocWrapper>
                <Flex>
                  <Avatar>
                    <SvgIcon type={loc.icon} />
                  </Avatar>
                  <Padbox>
                    <div>{loc.name}</div>
                    Уровень мостров: {loc.level.join(' - ')}
                  </Padbox>
                </Flex>
                <Divider />
                <Button disable={loc.locked} to={`adventure/${loc.id}`}>
                  перейти
                </Button>
              </LocWrapper>
            </Rythm>
          ) : null;
        })}
      </ScrollArea>
    </>
  ) : (
    <Redirect to={`/${gameName}/${locations[0].id}`} />
  );
};
