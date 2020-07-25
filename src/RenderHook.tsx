import React from 'react';

function RenderHook<
  H extends (...args: any[]) => any,
  P extends ReturnType<H>
>({ hook, children }: { hook: H; children(props: P): React.ReactNode }) {
  const useProps = hook();

  return <React.Fragment>{children({ ...useProps })}</React.Fragment>;
}

export { RenderHook };
