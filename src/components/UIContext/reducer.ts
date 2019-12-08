import { Dispatch } from 'react';

import { UIModel } from './UIModel';

type TToggleShowPlayerHealthText = { type: 'toggleShowPlayerHealthText' };

type Actions = TToggleShowPlayerHealthText;

export class ContextModel {
  state: UIModel = new UIModel();
  dispatch: Dispatch<Actions> = () => {};
}

export const reducer = (state: UIModel, action: Actions) => {
  switch (action.type) {
    case 'toggleShowPlayerHealthText':
      return {
        ...state,
        showPlayerHealthText: !state.showPlayerHealthText
      };
    default:
      return state;
  }
};
