import React, { FC } from 'react';

import { Rythm } from '../layout';
import { Animator } from '../animation/Animator';
import { UiFrame } from '../UiFrame';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { EColorType, TextColor } from '../layout/TextColor';
import { LockView } from '../layout/LockView';
import { getColorTypeByLevelDelta } from '../utils/getColorTypeByLevelDelta';
import layout from '../layout/layout.module.scss';
import { classJoin } from '../utils/classJoin';
import { usePlayerSelector } from '../Player/usePlayerSelector';
import { IRoom } from '../Room/createRoom';
import { useRouteMatch } from 'react-router';
import { ILocationRoute } from './ILocationRoute';

export const RoomCard: FC<IRoom> = props => {
  const { params } = useRouteMatch<ILocationRoute>();
  const player = usePlayerSelector();

  const { label, index, level, icon } = props;

  const levelDelta = player.level - level;
  const isLocked = !player.unlockedRoomIds.includes(index);

  return (
    <Rythm r={2}>
      <Animator animationName={'bounce'} animationDelay={index * 200}>
        <UiFrame>
          <div className={layout.flexStart}>
            <Icon
              className={classJoin([layout.borderInner, layout.marginRight])}
              type={icon}
              height={'52px'}
            />
            <div className={layout.fullWidth}>
              <h3
                className={classJoin([layout.flexBetween, layout.flexCenter])}
              >
                <TextColor colorType={EColorType.blue}>
                  <div>{label}</div>
                </TextColor>
                <TextColor colorType={getColorTypeByLevelDelta(levelDelta)}>
                  <b className={layout.typography5}>[ {level} ]</b>
                </TextColor>
              </h3>
            </div>
          </div>
          <hr className={layout.divider} />
          <div className={layout.borderInner}>
            <LockView
              isLocked={isLocked}
              labelLocked={
                <TextColor colorType={EColorType.grey}>
                  <p>
                    заблокировано. чтобы открыть пройдите предыдущий уровень
                  </p>
                </TextColor>
              }
            >
              <Button disable={isLocked} to={`${params.locationId}/${index}`}>
                войти
              </Button>
            </LockView>
          </div>
        </UiFrame>
      </Animator>
    </Rythm>
  );
};
