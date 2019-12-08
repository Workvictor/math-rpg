interface IObjective {
  kill: string; //creature id
  count: number;
}

export interface IQuest {
  id: number;
  text: string;
  name: string;
}

export const quests: IQuest[] = [
  {
    id: 0,
    name: 'Призыв к оружию',
    text:
      'Очнулся наконец? Повезло тебе, почти не задело, а я вот не такой везучий. Кровь идет сильно, и похоже мне уже не долго осталось. А тебе не помешало бы раздобыть какое-нибудь оружие. Попробуй поискать для начала в [Сарае]'
  }
];

export const getQuestById = (id: number): IQuest | undefined => {
  return quests.find(item => item.id === id);
};
