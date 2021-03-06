import React, { FC, useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import { HealthBar } from '../StatusBar/HealthBar';
import { useUIContext } from '../UIContext';
import { locations } from '../world/world';
import { Modal } from '../Modal';
import { usePlayerSelector } from './usePlayerSelector';

export const Health: FC = () => {
  const player = usePlayerSelector();

  const history = useHistory();

  const { dispatch: dispatchUI, state: uiState } = useUIContext();

  const onToggleShowPlayerHealthText = () => {
    dispatchUI({
      type: 'toggleShowPlayerHealthText'
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (player.healthPoints <= 0) {
      setIsOpen(true);
      // TODO set player [Home] link
      history.push(
        `/${player.name}/locations/${locations[player.currentLocationId].id}`
      );
    }
  }, [player.healthPoints, history, player.currentLocationId, player.name]);

  return (
    <>
      <HealthBar
        textIsVisible={uiState.showPlayerHealthText}
        onClick={onToggleShowPlayerHealthText}
        value={player.healthPoints}
        max={player.healthPointsMax}
      />
      <Modal modalIsOpen={isOpen} onClose={onClose}>
        Вас убили
      </Modal>
    </>
  );
};
