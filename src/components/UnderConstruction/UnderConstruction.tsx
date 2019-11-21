import React from 'react';
import styled from 'styled-components';

import { Padbox, BorderInner } from '../layout';

const Wrapper = styled(BorderInner)`
  height: 100%;
`;

export const UnderConstruction = () => {
  return (
    <Wrapper>
      <Padbox>В разработке</Padbox>
    </Wrapper>
  );
};
