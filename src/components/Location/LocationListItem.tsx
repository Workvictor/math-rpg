import React, { FC } from 'react';

import { ILocation, locations } from '../Game/world';
import { UIBlockInner, Rythm, FlexStart } from '../layout';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import styled from 'styled-components';
import { BorderIcon } from '../Icon/BorderIcon';
import { usePlayerContext } from '../Player/PlayerContext';

const RoomWrapper = styled(UIBlockInner)`
  color: ${props => props.theme.colors.blueDark};
`;

const StyledBorderIcon = styled(BorderIcon)`
  margin-right: 8px;
`;

const Description = styled.div`
  color: ${props => props.theme.colors.grey60};
`;

interface IProps {
  location: ILocation;
}

export const LocationListItem: FC<IProps> = ({ location }) => {
  const { id, icon, level, name } = location;
  const { state } = usePlayerContext();
  const isUnlocked = state.unlockedLocations.includes(id);
  const locationIsTheSame = state.location === id;
  return (
    <Rythm r={2}>
      <RoomWrapper>
        <FlexStart>
          <StyledBorderIcon type={icon} />
          <div>
            {name} [{level.join('-')}]
            {locationIsTheSame && <Description> - Вы здесь - </Description>}
          </div>
        </FlexStart>
        <Divider />
        {isUnlocked ? (
          <Button to={`locations/${location.name}`}>
            {locationIsTheSame ? 'продолжить' : 'войти'}
          </Button>
        ) : (
          <Description>
            Чтобы открыть, победите всех в "{locations[id - 1].name}"
          </Description>
        )}
      </RoomWrapper>
    </Rythm>
  );
};
