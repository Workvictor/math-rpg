import React from 'react';
import { RouteComponentProps } from 'react-router';

import { TabLabel } from '../TabLabel';
import { Towns, towns } from '../../store/world';

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
  console.log(props);
  const town = towns.find(({ id }) => id === townId);

  return town ? (
    <>
      <TabLabel label={town.name} />
      test {town.name}
    </>
  ) : null;
};
