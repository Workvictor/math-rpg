import React, { FC, ReactNode } from 'react';

interface IGoal {
  label: ReactNode;
  count: number;
}

interface IGoalList {
  title: ReactNode;
  items: IGoal[];
}

export const GoalList: FC<IGoalList> = props => {
  const { items, title } = props;
  return title ? (
    <div>
      <div>{title}</div>
      {items.map((item, key) => (
        <div key={key}>
          <div>
            {item.label} - {item.count}
          </div>
        </div>
      ))}
    </div>
  ) : null;
};
