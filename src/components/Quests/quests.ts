interface IObjective {
  kill: string; //creature id
  count: number;
}

export interface IQuest {
  id: number;
  text: string;
  name: string;
  hints: string[];
}

export const quests: IQuest[] = [
  {
    id: 0,
    name: 'Пролог',
    text:
      'Рано или поздно всему живому приходит конец. Противостоять этому могут только те, кто делает правильный выбор.',
    hints: [
      'Получайте опыт, сражаясь с монстрами',
      'Улучшайте умения своего персонажа'
    ]
  },
  {
    id: 1,
    name: 'Призыв к оружию',
    text:
      'Очнулся наконец? Повезло тебе, почти не задело, а я вот не такой везучий. Кровь идет сильно, и похоже мне уже не долго осталось. А тебе не помешало бы раздобыть какое-нибудь оружие. Попробуй поискать для начала в [Сарае]',
    hints: []
  }
];

export const getQuestById = (id: number): IQuest | undefined => {
  return quests.find(item => item.id === id);
};
