import React, { FC } from 'react';

import { ILocation, locations } from '../world/world';
import { Button } from '../Button';
import styled from 'styled-components';
import { usePlayerContext } from '../Player/PlayerContext';
import { AreaEntity } from '../AreaEntity';

const Description = styled.div`
  color: ${props => props.theme.colors.grey60};
`;

interface IProps {
  location: ILocation;
}

export const LocationEntity: FC<IProps> = ({ location }) => {
  const { id, icon, name, image } = location;
  const { state } = usePlayerContext();
  const locationIsTheSame = state.location === id;
  const isUnlocked = state.unlockedLocations.includes(id);

  return (
    <AreaEntity
      image={image}
      key={id}
      aside={icon}
      title={name}
      description={
        locationIsTheSame ? <Description> - Вы здесь - </Description> : null
      }
    >
      {isUnlocked ? (
        <Button to={`locations/${id}`}>
          {locationIsTheSame ? 'продолжить' : 'войти'}
        </Button>
      ) : (
        <Description>
          Чтобы открыть, пройдите "{locations[id - 1].name}"
        </Description>
      )}
    </AreaEntity>
  );
};
