import React, { FC } from 'react';

import { ILocation, locations } from '../world/world';
import { Button } from '../Button';
import { usePlayerContext } from '../Player/PlayerContext';
import { UiFrame } from '../UiFrame';
import styles from './styles.module.scss';
import { Animator } from '../animation/Animator';

interface IProps {
  location: ILocation;
}

export const LocationCard: FC<IProps> = ({ location }) => {
  const { id, name, image, quote } = location;
  const { state } = usePlayerContext();
  const locationIsTheSame = state.location === id;
  const isUnlocked = state.unlockedLocations.includes(id);

  const styleBody = {
    backgroundImage: `url(${image})`
  };

  return (
    <Animator
      className={styles.margin}
      animationName={'bounce'}
      animationDelay={id * 200}
    >
      <UiFrame className={styles.frame}>
        <div className={styles.body} style={styleBody}>
          <div className={styles.title}>{name}</div>
          <div className={styles.quote}>{quote}</div>
        </div>
        <div className={styles.footer}>
          {isUnlocked ? (
            <Button to={`locations/${id}`}>
              {locationIsTheSame ? 'продолжить' : 'войти'}
            </Button>
          ) : (
            `Чтобы открыть, пройдите "${locations[id - 1].name}"`
          )}
        </div>
      </UiFrame>
    </Animator>
  );
};
