const root = '/';
const gameIdParameter = 'gameId';

export const character = 'character';
export const map = 'map';
export const backpack = 'backpack';
export const questbook = 'questbook';

export enum ELink {
  character = 'character',
  map = 'map',
  backpack = 'backpack',
  questbook = 'questbook',
  quest = 'quest'
}

const addPathId = (parameter: string) => `/:${parameter}`;
const addPathIdParams = (parameter: string, args: string[]) =>
  `${addPathId(parameter)}(${args.join('|')})`;

export const createPath = (ids: string[]) => {
  const value = addPathIdParams(gameIdParameter, ids);
  const pathTo = (to: ELink) => {
    return [value, to].join(root);
  };
  const linkTo = (to: ELink) => {
    return [value, to].join(root);
  };
  return {
    value,
    character: pathTo(ELink.character),
    map: pathTo(ELink.map),
    backpack: pathTo(ELink.backpack),
    questbook: pathTo(ELink.questbook),
    linkTo: {
      value,
      character: linkTo(ELink.character),
      map: linkTo(ELink.map),
      backpack: linkTo(ELink.backpack),
      questbook: linkTo(ELink.questbook)
    }
  };
};
