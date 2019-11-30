interface IObjective {
  kill: string; //creature id
  count: number;
}

interface IQuest {
  id: number;
  text: string;
  name: string;
  objectives: IObjective;
}

export const quests: IQuest[] = [
  {
    name: 'Призыв к оружию',
    text:
      'Приветствую тебя, странник! Надеюсь, ты готов к подвигам, поскольку для тебя есть дело. И я имею в виду не мирные заботы. Наше ополчение с трудом поддерживает мир здесь, слишком многие из нас находятся в дальних краях, а тревожных вестей меньше не становится. И потому мы надеемся на помощь всех, кто готов защитить свой дом. Если ты готов откликнуться на призыв, то помоги нам разобраться со стаей волков, обосновавшихся на посевных полях.',
    objectives: {
      kill: 'wolf',
      count: 10
    }
  }
].map((i, id) => ({ ...i, id: id + 1 }));

export const getQuestById = (id: number): IQuest | undefined => {
  return quests.find(item => item.id === id);
};
