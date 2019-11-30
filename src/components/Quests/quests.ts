interface IObjective {
  kill: string; //creature id
  count: number;
}

interface IQuest {
  id: number;
  text: string;
  name: string;
}

export const quests: IQuest[] = [
  {
    name: 'Призыв к оружию',
    text:
      'Ааа, очнулся наконец? Повезло тебе, почти не задело, а я вот не такой везучий. Кровь идет сильно, и похоже мне уже не долго осталось. А тебе не помешало бы меч в руках научиться держать. В [Соседней Комнате] можно найти тренировочный меч. За одной из закрытых дверей, да придется наломать дров, что бы отыскать его.'
  }
].map((i, id) => ({ ...i, id: id + 1 }));

export const getQuestById = (id: number): IQuest | undefined => {
  return quests.find(item => item.id === id);
};
