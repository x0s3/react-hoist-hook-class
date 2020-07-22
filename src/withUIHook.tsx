import React from 'react';

function withUIHook<H extends object>(
  HookComponent: React.ComponentType<H & any>
) {
  type ClassProps = React.ComponentProps<typeof HookComponent>['children'];

  return function <C>(ClassComponent: React.ComponentType<C>) {
    return (
      <HookComponent>
        {(props: ClassProps) => <ClassComponent {...props} />}
      </HookComponent>
    );
  };
}

export { withUIHook };
