interface IUnlockRequirements {
  lvl?: number;
  prevId?: string;
}

interface IDoneRequirements {
  playerState?: any; // TODO playerState
}

export class QuestModel {
  static counter = 1000;
  static names: string[] = [];
  public id: string;
  /**
   * pending — the task did not met the unlocking requirement yet
   * unlocked — the unlocking requirements are met, but it is not in progress yet, maybe because of the limit of possible tasks in progress in progress — the task was unlocked and shown to the player. It might be useful to have a sub-state, or a separate state for new task. This symbols that the task is technically in progress, but player did not read the objections yet. I did not give it a separate state because it is UI specific
   * completed — task was in progress and player did everything necessary to complete it. Now it is time to collect the reward. If there is no reward the task might directly switch to the next state. There are also systems where quests autocomplete
   * done — task was completed and user collected the reward
   * canceled — this state is important if you want a quest to disappear. It’s particularly useful, if you introduce a new quests which player, who advanced beyond a certain threshold, shall not see
   */
  public status: 'pending' | 'unlocked' | 'completed' | 'done' | 'canceled' =
    'pending';
  public unlockRequirements: IUnlockRequirements = {};
  public doneRequirements: IDoneRequirements = {};
  constructor(public name: string, public text: string | string[]) {
    if (!QuestModel.names.includes(name)) {
      console.warn('Same quest name: ', name);
    }
    QuestModel.counter++;
    this.id = `quest_${QuestModel.counter}`;
  }
}
