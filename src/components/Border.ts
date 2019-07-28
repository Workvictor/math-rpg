import styled from "styled-components";

export const Border = styled.div`
  min-height: 22px;
  min-width: 22px;
  background-color: #000;
  padding: 0 1px 1px 1px;
  overflow: hidden;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #252525;
  border-bottom-color: #131313;
  transform-origin: center;
  box-shadow: 0 -1px 1px #5f5f5f, inset 0 0 0 2px rgba(0, 0, 0, 0.5);
`;

export const BorderInner = styled(Border)`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 2px;
  box-shadow: 0 0 0 2px #000000;
`;
