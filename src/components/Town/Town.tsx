import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Howl } from 'howler';

import { TabLabel } from '../TabLabel';
import { locations, Towns, towns } from '../Game/world';
import {
  UIBlockInner,
  Padbox,
  Flex,
  ScrollArea,
  BorderInner,
  Rythm,
  FlexWide,
  Border
} from '../layout';
import { Character } from '../Character';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import styled from 'styled-components';
import { SvgIcon } from '../icons';
import { HealButton } from '../HealButton';
import { ButtonGroup } from '../Button/ButtonGroup';

const sounds = [
  new Howl({
    src: ['music/Path to Lake Land.mp3'],
    volume: 0.05
  }),
  new Howl({
    src: ['music/Dark_Rainy_Night(ambience).ogg'],
    volume: 0.25
  })
];

const LocWrapper = styled(UIBlockInner)`
  color: ${props => props.theme.colors.blueDark};
`;

const Avatar = styled(Border)`
  font-size: 32px;
  flex-shrink: 0;
  display: flex;
  color: ${props => props.theme.colors.grey60};
`;

export const Town = (
  props: RouteComponentProps<{
    gameName: string;
    townId: Towns;
    tab: string;
  }>
) => {
  const {
    match: {
      params: { townId, gameName }
    }
  } = props;

  const town = towns.find(({ id }) => id === townId);

  return town ? (
    <>
      <BorderInner>
        <TabLabel label={town.name} />

        <Character />
        <Padbox>
          <div>Действия:</div>
          <ButtonGroup>
            <HealButton gameName={gameName} />
            <Button disable>чинить(300)</Button>
            <Button disable>отдых(1000)</Button>
          </ButtonGroup>
        </Padbox>
      </BorderInner>
      <Divider />
      <ScrollArea>
        <Padbox>Локации:</Padbox>
        {town.locationIds.map(locationId => {
          const loc = locations.find(item => item.id === locationId);
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
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};
