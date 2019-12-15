import backpack from './Backpack';
import barbarian from './Barbarian';
import barrel from './Barrel';
import barrier from './Barrier';
import bearHead from './BearHead';
import bookmark from './Bookmark';
import cancel from './Cancel';
import castle from './Castle';
import click from './Click';
import cementShoes from './CementShoes';
import checkboxTree from './CheckboxTree';
import compass from './Compass';
import crossSwords from './CrossSwords';
import dungeonGate from './DungeonGate';
import electric from './Electric';
import entryDoor from './EntryDoor';
import forest from './Forest';
import granary from './Granary';
import hamburgerMenu from './HamburgerMenu';
import heart from './Heart';
import hideout from './Hideout';
import house from './House';
import info from './Info';
import lootBag from './LootBag';
import rat from './Rat';
import settings from './Settings';
import skeleton from './Skeleton';
import skills from './Skills';
import slalom from './Slalom';
import village from './Village';
import walk from './Walk';
import wheat from './Wheat';
import windmill from './Windmill';
import wolfHead from './WolfHead';
import woodenDoor from './WoodenDoor';
import trashcan from './Trashcan';
import fist from './Fist';
import bladeDrag from './BladeDrag';
import sprint from './Sprint';
import healing from './Healing';
import healPlus from './HealPlus';

export const icons = [
  trashcan,
  healPlus,
  healing,
  sprint,
  fist,
  bladeDrag,
  backpack,
  barbarian,
  barrel,
  barrier,
  bearHead,
  bookmark,
  cancel,
  castle,
  cementShoes,
  checkboxTree,
  compass,
  crossSwords,
  dungeonGate,
  electric,
  entryDoor,
  forest,
  granary,
  hamburgerMenu,
  heart,
  hideout,
  house,
  info,
  lootBag,
  rat,
  settings,
  skeleton,
  skills,
  slalom,
  village,
  walk,
  wheat,
  windmill,
  wolfHead,
  woodenDoor,
  click
];

export const iconType = {
  trashcan,
  healPlus,
  healing,
  backpack,
  fist,
  sprint,
  bladeDrag,
  click,
  barbarian,
  barrel,
  barrier,
  bearHead,
  bookmark,
  cancel,
  castle,
  cementShoes,
  checkboxTree,
  compass,
  crossSwords,
  dungeonGate,
  electric,
  entryDoor,
  forest,
  granary,
  hamburgerMenu,
  heart,
  hideout,
  house,
  info,
  lootBag,
  rat,
  settings,
  skeleton,
  skills,
  slalom,
  village,
  walk,
  wheat,
  windmill,
  wolfHead,
  woodenDoor
};

export type TIcons = keyof typeof iconType;
