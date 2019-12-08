import React from 'react';
import { useRouteMatch } from 'react-router';

import { TabLabel } from '../TabLabel';
import { Button } from '../Button';
import { locations } from '../world/world';
import { ILocationRoute } from '../Location/ILocationRoute';

export const LocationTab = () => {
  const {
    params: { locationId, gameName }
  } = useRouteMatch<ILocationRoute>();

  const location = locations.find(
    location => location.id === parseInt(locationId)
  );

  return location ? (
    <TabLabel label={location.name}>
      <Button to={`/${gameName}/locations`}>на карту</Button>
    </TabLabel>
  ) : null;
};
