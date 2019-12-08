import React from 'react';

import { Button } from './Button';

export const EnterButton: typeof Button = props => {
  return <Button {...props}>войти</Button>;
};
