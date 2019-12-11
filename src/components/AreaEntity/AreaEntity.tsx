import React, { FC } from 'react';

import { ColorText } from '../layout';
import { EntityVisual, IEntityVisual } from '../EntityVisual/EntityVisual';
import { EnterButton } from '../Button/EnterButton';
import { usePlayerContext } from '../Player/PlayerContext';

interface IRoomEntity extends IEntityVisual {
  level?: number;
  locked?: boolean;
  to?: string;
}

export const AreaEntity: FC<IRoomEntity> = props => {
  const { state: player } = usePlayerContext();
  const {
    aside,
    title,
    description,
    level,
    locked,
    to,
    children,
    image
  } = props;
  const getLevelText = () => {
    if (level && player.level - level > 4) {
      return (
        <ColorText textColor={'grey70'}>
          <b>[{level}]</b>
        </ColorText>
      );
    }
    if (level && player.level - level > 2) {
      return (
        <ColorText textColor={'green'}>
          <b>[{level}]</b>
        </ColorText>
      );
    }
    if (level && player.level - level < -2) {
      return (
        <ColorText textColor={'darkred'}>
          <b>[{level}]</b>
        </ColorText>
      );
    }
    if (level) {
      return (
        <ColorText textColor={'goldenrod'}>
          <b>[{level}]</b>
        </ColorText>
      );
    }
    return null;
  };
  const levelText = getLevelText();
  return (
    <EntityVisual
      image={image}
      aside={aside}
      title={<ColorText textColor={'blueDark'}>{title}</ColorText>}
      description={description}
      level={levelText}
    >
      {children || <EnterButton disable={locked} to={to} />}
    </EntityVisual>
  );
};
