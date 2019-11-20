import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';

import { TabLabel } from '../TabLabel';
import { locations, Towns, towns } from '../../store/world';
import { UIBlockInner } from '../layout';
import { Link } from 'react-router-dom';

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
      <TabLabel label={town.name} />
      {town.locationIds.map(locationId => {
        const loc = locations.find(item => item.id === locationId);
        return loc ? (
          <Link key={locationId} to={`adventure/${loc.id}`}>
            <UIBlockInner>
              <div>{loc.name}</div>
              Уровень мостров: {loc.level.join(' - ')}
            </UIBlockInner>
          </Link>
        ) : null;
      })}
    </>
  ) : (
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};
