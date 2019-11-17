interface IObjective {
  kill: string; //creature id
  count: number;
}

interface IQuest {
  id: string;
  text: string;
  name: string;
  objectives: IObjective;
}

export const quests: IQuest[] = [
  {
    id: '1',
    name: 'Призыв к оружию',
    text:
      'Приветствую тебя, странник! Надеюсь, ты готов к подвигам, поскольку для тебя есть дело. И я имею в виду не мирные заботы. Наше ополчение с трудом поддерживает мир здесь, слишком многие из нас находятся в дальних краях, а тревожных вестей меньше не становится. И потому мы надеемся на помощь всех, кто готов защитить свой дом. Если ты готов откликнуться на призыв, то помоги нам разобраться со стаей волков, обосновавшихся на посевных полях.',
    objectives: {
      kill: 'wolf',
      count: 10
    }
  }
];

export const getQuestById = (id: string): IQuest | undefined => {
  return quests.find(item => item.id === id);
};
