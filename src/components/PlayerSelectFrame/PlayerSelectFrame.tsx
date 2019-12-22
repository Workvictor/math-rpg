import React, { FC } from 'react';
import styled from 'styled-components';

import { Rythm, UIBlockInner } from '../layout';

import { Button, IconButton } from '../Button';
import { Divider } from '../layout/Divider';
import { useGameDispatcher } from '../Game/GameContext';
import { Icon } from '../Icon';
import { Modal, useModalState } from '../Modal';
import { IPlayerBase } from '../Player/store/IPlayerBase';

const Wrapper = styled(UIBlockInner)`
  width: auto;
  margin: 3px 3px 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  margin-bottom: 16px;
  max-width: 120px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Name = styled.span`
  color: ${p => p.theme.colors.purpleLight};
`;

const DeleteButton = styled(IconButton)`
  font-size: 16px;
  position: absolute;
  top: -4px;
  right: -4px;
`;

const StyledModal = styled(Modal)`
  background: linear-gradient(
    to bottom,
    ${p => p.theme.colors.blueDark200} 30px,
    ${p => p.theme.colors.grey10} 80px,
    ${p => p.theme.colors.grey10} calc(100% - 30px),
    ${p => p.theme.colors.grey20}
  );
`;

interface IProps {
  player: IPlayerBase;
}

export const PlayerSelectFrame: FC<IProps> = props => {
  const { player } = props;
  const { level, name } = player;

  const { modalIsOpen, onClose, openModal } = useModalState();

  const gameDispatch = useGameDispatcher();

  const onRemovePlayer = () => {
    gameDispatch({
      type: 'deletePlayer',
      name
    });
  };
  return (
    <Wrapper>
      <Rythm r={2}>{name}</Rythm>
      <Rythm r={2}>уровень - {level}</Rythm>
      <Divider />
      <DeleteButton onClick={openModal}>
        <Icon type={'cancel'} />
      </DeleteButton>
      <StyledButton to={`/${name}`}>Продолжить</StyledButton>
      <StyledModal
        modalIsOpen={modalIsOpen}
        onClose={onClose}
        title={'Удаление персонажа'}
        onSubmit={onRemovePlayer}
      >
        Вы действительно хотите удалить <Name>{name}</Name>?
      </StyledModal>
    </Wrapper>
  );
};
