import React from 'react';

interface IAnimate {
  visible?: boolean;
  delay?: number;
  unmountOnAnimationEnd?: boolean;
  keepContent?: boolean;
  onMountAnimation?: 'fadeIn' | 'fadeInRight' | 'fadeOut';
  onUnMountAnimation?: 'fadeIn' | 'fadeInRight' | 'fadeOut';
}

export const Animate: React.FC<IAnimate> = ({
  children,
  visible = true,
  unmountOnAnimationEnd,
  keepContent
}) => {
  const [show, toggleShow] = React.useState<boolean>(false);
  const [classNames, setClassNames] = React.useState<string>('');

  React.useEffect(() => {
    if (visible) {
      toggleShow(true);
    }
  }, [visible]);

  React.useEffect(() => {
    if (show) {
      setClassNames('animated fadeIn faster');
    } else {
      setClassNames('animated fadeOut faster');
    }
  }, [show]);

  const onAnimationEnd = React.useCallback(() => {
    if (!visible || unmountOnAnimationEnd) {
      toggleShow(false);
    }
  }, [visible, unmountOnAnimationEnd]);

  return show ? (
    <span
      onAnimationEnd={onAnimationEnd}
      className={classNames}
      style={{
        display: 'inline-block'
      }}
    >
      {children}
    </span>
  ) : keepContent ? (
    <>{children}</>
  ) : null;
};
