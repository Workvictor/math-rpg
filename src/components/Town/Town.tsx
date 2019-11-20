import React from 'react';
import { RouteComponentProps } from 'react-router';

import { TabLabel } from '../TabLabel';
import { locations, Towns, towns } from '../../store/world';
import { UIBlockInner } from '../layout';

export const Town = (
  props: RouteComponentProps<{
    gameName: string;
    townId: Towns;
    tab: string;
  }>
) => {
  const {
    match: {
      path,
      params: { townId }
    }
  } = props;
  const town = towns.find(({ id }) => id === townId);

  return town ? (
    <>
      <TabLabel label={town.name} />
      {town.locationIds.map(locationId => {
        const loc = locations.find(item => item.id === locationId);
        return loc ? (
          <UIBlockInner key={locationId}>
            <div>{loc.name}</div>
            Уровень мостров: {loc.level.join(' - ')}
          </UIBlockInner>
        ) : null;
      })}
    </>
  ) : null;
};
