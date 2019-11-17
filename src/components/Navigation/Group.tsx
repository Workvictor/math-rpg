import React, { FC } from 'react';
import styled from 'styled-components';

import { BorderInner } from '../layout';

const Wrapper = styled(BorderInner)`
  padding: 1px;
`;

interface IGroup {
  visible: boolean;
}

export const Group: FC<IGroup> = ({ children, visible }) =>
  visible ? <Wrapper>{children}</Wrapper> : null;
