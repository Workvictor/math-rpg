import React, { FC } from 'react';
import styled from 'styled-components';

import { Border } from '../layout';

const Wrapper = styled(Border.withComponent('input'))`
  background-color: black;
  color: beige;
  border-radius: 4px;
  outline: none;
  padding: 4px 8px;
  margin: 4px;
`;

interface Interface {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  maxLength?: number;
  regExpReplacer?: RegExp;
}

export const Input: FC<Interface> = props => {
  const {
    placeholder,
    onChange,
    value,
    maxLength = 12,
    regExpReplacer = new RegExp('')
  } = props;
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(
        e.currentTarget.value.slice(0, maxLength).replace(regExpReplacer, '')
      );
    }
  };
  return (
    <Wrapper value={value} onChange={_onChange} placeholder={placeholder} />
  );
};
