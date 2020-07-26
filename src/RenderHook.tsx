import React from 'react';

function RenderHook<
  H extends (...args: any[]) => any,
  A extends Parameters<H>,
  P extends ReturnType<H>
>({
  hook,
  args = [] as any,
  children
}: {
  args?: A;
  children(props: P): React.ReactNode;
  hook: H;
}) {
  const useProps = hook(...args);

  return <React.Fragment>{children({ ...useProps })}</React.Fragment>;
}

export { RenderHook };
