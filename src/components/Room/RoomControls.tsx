import React, { FC } from 'react';
import { useRouteMatch } from 'react-router';

import { Rythm, UIBlockInner } from '../layout';
import { Button } from '../Button';
import { IRoomRoute } from './IRoomRoute';
import { ProgressBar } from '../ProgressBar';
import layout from '../layout/layout.module.scss';

interface IProps {
  killCount: number;
  killCountMax: number;
  onRepeat: () => void;
}

export const RoomControls: FC<IProps> = props => {
  const { params } = useRouteMatch<IRoomRoute>();
  const { killCount, killCountMax, onRepeat } = props;

  return (
    <Rythm>
      <UIBlockInner>
        <div className={layout.flexCenter}>
          progress
          <ProgressBar
            value={killCount}
            max={killCountMax}
            className={layout.marginLeft}
          />
        </div>
        {killCount === killCountMax && (
          <div>
            <Rythm r={2}>well done, you killed them all!</Rythm>
            <div>
              <Button
                to={`/${params.gameName}/locations/${params.locationId}}`}
              >
                exit
              </Button>
              <Button onClick={onRepeat}>repeat</Button>
            </div>
          </div>
        )}
      </UIBlockInner>
    </Rythm>
  );
};
