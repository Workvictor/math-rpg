import React from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { TabLabel } from '../TabLabel';
import { rooms, locations } from '../Game/world';
import {
  UIBlockInner,
  Padbox,
  ScrollArea,
  BorderInner,
  Rythm,
  FlexStart
} from '../layout';
import { Player } from '../Player';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import styled from 'styled-components';
import { HealButton } from '../HealButton';
import { ButtonGroup } from '../Button/ButtonGroup';
import { BorderIcon } from '../Icon/BorderIcon';

const RoomWrapper = styled(UIBlockInner)`
  color: ${props => props.theme.colors.blueDark};
`;

const StyledBorderIcon = styled(BorderIcon)`
  margin-right: 8px;
`;

export const Location = () => {
  const {
    params: { locationName, gameName }
  } = useRouteMatch<{
    gameName: string;
    locationName: string;
  }>();

  const location = locations.find(location => location.name === locationName);

  return location ? (
    <>
      <TabLabel label={location.name}>
        <Button to={`/${gameName}/locations`}>на карту</Button>
      </TabLabel>
      <BorderInner>
        <Player />
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
        {location.roomIds.map(roomId => {
          const room = rooms.find(item => item.id === roomId);
          return room ? (
            <Rythm r={2} key={roomId}>
              <RoomWrapper>
                <FlexStart>
                  <StyledBorderIcon type={room.icon} />
                  <div>
                    <div>
                      {room.name} [{room.level.join('-')}]
                    </div>
                    {room.description}
                  </div>
                </FlexStart>
                <Divider />
                <Button
                  disable={room.locked}
                  to={`${location.name}/${room.name}`}
                >
                  войти
                </Button>
              </RoomWrapper>
            </Rythm>
          ) : null;
        })}
      </ScrollArea>
    </>
  ) : (
    <Redirect to={`/${gameName}/${locations[0].name}`} />
  );
};
