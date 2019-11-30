import React from 'react';
import { Redirect, useRouteMatch } from 'react-router';

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
import { Icon } from '../Icon';
import { HealButton } from '../HealButton';
import { ButtonGroup } from '../Button/ButtonGroup';

const RoomWrapper = styled(UIBlockInner)`
  color: ${props => props.theme.colors.blueDark};
`;

const Avatar = styled(Border)`
  font-size: 32px;
  flex-shrink: 0;
  display: flex;
  color: ${props => props.theme.colors.grey60};
`;

export const Location = () => {
  const {
    params: { locationId, gameName }
  } = useRouteMatch<{
    gameName: string;
    locationId: ETowns;
    tab: string;
  }>();

  const town = locations.find(({ id }) => id === locationId);

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
        {town.roomIds.map(roomId => {
          const room = rooms.find(item => item.id === roomId);
          return room ? (
            <Rythm r={2} key={roomId}>
              <RoomWrapper>
                <Flex>
                  <Avatar>
                    <Icon type={room.icon} />
                  </Avatar>
                  <Padbox>
                    <div>{room.name}</div>
                    Уровень мостров: {room.level.join(' - ')}
                  </Padbox>
                </Flex>
                <Divider />
                <Button disable={room.locked} to={`adventure/${room.id}`}>
                  перейти
                </Button>
              </RoomWrapper>
            </Rythm>
          ) : null;
        })}
      </ScrollArea>
    </>
  ) : (
    <Redirect to={`/${gameName}/${locations[0].id}`} />
  );
};
