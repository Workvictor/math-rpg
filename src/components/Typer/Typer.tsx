import React from 'react';

import { useRaf } from '../utils/RAF';

interface ITyper {
  children: string | string[];
  delay?: number;
}

export const Typer = ({ children }: ITyper) => {
  const [anim, setAnim] = React.useState<boolean>(true);
  const [currentText, setCurrentText] = React.useState<string>('');
  const text = React.useRef<string>(
    Array.isArray(children) ? children.join('') : children
  );

  const loop = React.useCallback(() => {
    const nextIndex = anim
      ? Math.min(text.current.length, currentText.length + 1)
      : text.current.length;
    setCurrentText(text.current.slice(0, nextIndex));
    return anim && currentText.length < text.current.length;
  }, [currentText, anim]);

  const onClick = () => setAnim(false);

  useRaf(loop);

  return <div onClick={onClick}>{currentText}</div>;
};
