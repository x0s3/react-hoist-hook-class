import React from 'react';

function withHook<C, T extends object>(
  ClassComponent: React.ComponentType<C>,
  injectedProps?: T
) {
  return function <H extends (...args: any[]) => any, A extends Parameters<H>>(
    useHook: H,
    ...args: A
  ) {
    const propsFromHook = useHook(...args);

    return <ClassComponent {...propsFromHook} {...injectedProps} />;
  };
}

export { withHook };
