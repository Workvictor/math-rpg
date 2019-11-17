import styled from 'styled-components';

import { FullWidth } from './FullWidth';

export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const FlexStart = styled(Flex)`
  align-items: flex-start;
`;

export const FlexWide = Flex.withComponent(FullWidth);

export const FlexEnd = styled(Flex)`
  justify-content: flex-end;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexColumnWide = FullWidth.withComponent(FlexColumn);

export const FlexBetween = styled(Flex)`
  justify-content: space-between;
`;
