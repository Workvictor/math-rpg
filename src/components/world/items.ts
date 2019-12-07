
export const equippableItems = {
  stick: {
    equippable: true,
    damage: [2, 4]
  }
}

export const items = {
  stick: {
    name: 'stick',
    label: 'палка',
  }
};

export type EItem = keyof typeof items;

export type IItem = typeof items[EItem];
