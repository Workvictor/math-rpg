import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Portal: FC = props => {
  const node = document.createElement('div');
  document.body.appendChild(node);
  return ReactDOM.createPortal(<Wrapper>{props.children}</Wrapper>, node);
};
