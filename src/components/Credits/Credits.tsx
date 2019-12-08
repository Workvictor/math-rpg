import React from 'react';
import styled from 'styled-components';

import { ScrollArea, Padbox, FlexBetween } from '../layout';
import { Divider } from '../layout/Divider';
import { TabLabel } from '../TabLabel';
import { iconsList } from '../Icon/iconsList';

const IconWrapper = styled.span`
  font-size: 42px;
`;

export const Credits = () => {
  return (
    <>
      <TabLabel label={'Авторы'} />
      <ScrollArea>
        <Padbox>
          <span>идея, дизайн и код - </span>
          <a
            className={'link'}
            href={'https://github.com/Workvictor'}
            target={'_blank'}
          >
            workvictor
          </a>
          (victorpunko@gmail.com)
        </Padbox>
        <Divider />
        <Padbox>
          <div>иконки:</div>
          <Divider />
          {iconsList.map(({ authorUrl, component: ListComponent }) => (
            <div key={authorUrl}>
              <FlexBetween>
                <IconWrapper>
                  <ListComponent />
                </IconWrapper>
                <a className={'link'} href={authorUrl} target={'_blank'}>
                  автор
                </a>
              </FlexBetween>
              <Divider />
            </div>
          ))}
        </Padbox>
      </ScrollArea>
    </>
  );
};
