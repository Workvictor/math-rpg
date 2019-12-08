type ITargetId = number | null;

export const didAttack = (targetId: ITargetId, loseStaminaAmount: number) => {
  type Actions = 'didAttack';
  return {
    type: 'didAttack' as Actions,
    loseStaminaAmount,
    targetId
  };
};
