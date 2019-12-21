import React, { FC } from 'react';

import { Rythm } from '../layout';
import { Animator } from '../animation/Animator';
import { RoomModel } from '../world/RoomModel';
import { UiFrame } from '../UiFrame';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { EColorType, TextColor } from '../layout/TextColor';
import { LockView } from '../layout/LockView';
import { GoalList } from '../GoalList';
import { clobs } from '../world/clobs';
import { getColorTypeByLevelDelta } from '../utils/getColorTypeByLevelDelta';
import layout from '../layout/layout.module.scss';
import { classJoin } from '../utils/classJoin';
import { usePlayerSelector } from '../Player/usePlayerSelector';

interface IProps {
  locationId: string;
  index: number;
  room: RoomModel;
}

export const RoomCard: FC<IProps> = props => {
  const player = usePlayerSelector();
  const { index, room } = props;
  const { label, locationId, name, level, icon } = room;

  const levelDelta = player.level - room.level;
  const isLocked = !player.unlockedRoomIds.includes(room.id);

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
              <div>
                <GoalList
                  title={'Задания:'}
                  items={room.goals.map(i => ({
                    label: `убить [${clobs[i.clobType].label}]`,
                    count: i.count
                  }))}
                />
              </div>
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
              <Button disable={isLocked} to={`${locationId}/${name}`}>
                войти
              </Button>
            </LockView>
          </div>
        </UiFrame>
      </Animator>
    </Rythm>
  );
};
