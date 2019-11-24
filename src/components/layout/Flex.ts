import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const FlexStart = styled(Flex)`
  align-items: flex-start;
`;

export const FlexWide = styled(Flex)`
  width: 100%;
`;

export const FlexEnd = styled(Flex)`
  justify-content: flex-end;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexColumnWide = styled(FlexColumn)`
  width: 100%;
`;

export const FlexBetween = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;
