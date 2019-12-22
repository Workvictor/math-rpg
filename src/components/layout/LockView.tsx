import React, { FC, ReactNode } from 'react';

interface IProps {
  isLocked?: boolean;
  labelLocked: ReactNode;
}

export const LockView: FC<IProps> = props => {
  const { children, isLocked, labelLocked } = props;
  return isLocked ? <>{labelLocked}</> : <>{children}</>;
};
