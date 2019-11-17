import { global } from '../global';

export const getLSGameId = () => localStorage.getItem(global.gameId) || '';
export const setLSGameId = (value: string) =>
  localStorage.setItem(global.gameId, value);
export const removeLSGameId = () => localStorage.removeItem(global.gameId);

export const getLSGames = () =>
  JSON.parse(localStorage.getItem('adventure') || '') || [];
export const setLSGames = (value: string) =>
  localStorage.setItem('adventure', value);
