import React, { useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';

import { TabLabel } from '../TabLabel';
import { locations, Towns, towns } from '../../store/world';
import {
  UIBlockInner,
  Padbox,
  Flex,
  ScrollArea,
  BorderInner,
  Rythm
} from '../layout';
import { Link } from 'react-router-dom';
import { Character } from '../Character';
import { useGameProvider } from '../../hooks/useGameProvider';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import styled from 'styled-components';

const HealButton = styled(Button)`
  width: 90px;
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
  const { updateGame, state } = useGameProvider();

  const player = state.game[gameName];

  const healRefreshTimeout = 5000;

  const [healRefresh, setHealRefresh] = useState(healRefreshTimeout);

  const town = towns.find(({ id }) => id === townId);

  const onHeal = () => {
    if (healRefresh === 0) {
      updateGame(gameName, prev => ({
        healthPoints: Math.min(
          prev.healthPointsMax,
          prev.healthPoints + player.healValue
        )
      }));
      setHealRefresh(healRefreshTimeout);
    }
  };

  useEffect(() => {
    if (healRefresh > 0) {
      setTimeout(() => {
        setHealRefresh(prev => Math.max(0, prev - 1000));
      }, 1000);
    }
  }, [healRefresh]);

  return town ? (
    <>
      <BorderInner>
        <TabLabel label={town.name} />

        <Character name={gameName} />
        <Padbox>
          Действия:
          <Flex>
            {player.healthPoints < player.healthPointsMax && (
              <HealButton disable={healRefresh > 0} onClick={onHeal}>
                лечить
                {healRefresh > 0 && (
                  <span>({Math.floor(healRefresh / 1000)})</span>
                )}
              </HealButton>
            )}
            <HealButton disable>чинить(300)</HealButton>
            <HealButton disable>отдых(1000)</HealButton>
          </Flex>
        </Padbox>
      </BorderInner>
      <Divider />
      {/*<BorderInner>*/}
        <ScrollArea>
          <Padbox>Локации:</Padbox>
          {town.locationIds.map(locationId => {
            const loc = locations.find(item => item.id === locationId);
            return loc ? (
              <Rythm r={2} key={locationId}>
                <Link to={`adventure/${loc.id}`}>
                  <UIBlockInner>
                    <div>{loc.name}</div>
                    Уровень мостров: {loc.level.join(' - ')}
                  </UIBlockInner>
                </Link>
              </Rythm>
            ) : null;
          })}
        </ScrollArea>
      {/*</BorderInner>*/}
    </>
  ) : (
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};
