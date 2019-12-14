export const classJoin = (
  classNames: Array<string | undefined | null | boolean>
) => {
  return classNames
    .filter(i => i)
    .join(' ')
    .trim();
};
