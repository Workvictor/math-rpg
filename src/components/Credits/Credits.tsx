import React from 'react';
import styled from 'styled-components';

import { ScrollArea, Padbox, FlexBetween } from '../layout';
import { Divider } from '../layout/Divider';
import { icons } from '../Icon/icons1';
import { TIcon } from '../Icon/TIcon';
import { Icon } from '../Icon';
import { TabLabel } from '../TabLabel';

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
        </Padbox>
        <Divider />
        <Padbox>
          <div>иконки:</div>
          <Divider />
          {Object.keys(icons).map(key => (
            <>
              <FlexBetween key={key}>
                <IconWrapper>
                  <Icon type={key as TIcon} />
                </IconWrapper>
                <a
                  className={'link'}
                  href={icons[key as TIcon].authorUrl}
                  target={'_blank'}
                >
                  автор
                </a>
              </FlexBetween>
              <Divider />
            </>
          ))}
        </Padbox>
      </ScrollArea>
    </>
  );
};
