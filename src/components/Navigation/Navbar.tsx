import React from 'react';
import styled from 'styled-components';

import { BorderInner, Flex } from '../layout';
import { IconButton } from '../Button';
import { Icon } from '../Icon';

const Wrapper = styled(Flex.withComponent(BorderInner))`
  border-bottom: none;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  //font-size: 18px;
  //z-index: 1;
  //padding: 4px 0 0 4px;
  justify-content: flex-end;
`;

export const Navbar = () => {
  return (
    <nav>
      <IconButton soundType={'navigation'} to={'/'}>
        <Icon type={'hamburgerMenu'} />
      </IconButton>
    </nav>
  );
};
