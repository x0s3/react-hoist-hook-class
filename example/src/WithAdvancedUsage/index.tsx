import React, { PureComponent } from 'react';
import { withHook, withUIHook } from 'react-hoist-hook-class';

import { useCounter } from '../useCounter';

type CounterHook = ReturnType<typeof useCounter>;

type HookChildrenProps = {
  resetUIHook: () => void;
};

type ClassProps = CounterHook & HookChildrenProps;

interface HookProps {
  children(): React.ReactNode;
  children(props: HookChildrenProps): React.ReactNode;
}

class ClassWithCounterHookAndPropsFromHook extends PureComponent<ClassProps> {
  render() {
    const { counter, increment, decrement, reset, resetUIHook } = this.props;

    return (
      <div className='counter__div_class'>
        <h1>CLASS COUNTER VALUE: {counter}</h1>
        <button onClick={resetUIHook}>RESET HOOK UI COUNTER</button>
        <button onClick={increment}>INCREMENT</button>
        <button onClick={decrement}>DECREMENT</button>
        <button onClick={reset}>RESET</button>
      </div>
    );
  }
}

const ClassWithCounterHookUI = (props: HookChildrenProps) =>
  withHook(ClassWithCounterHookAndPropsFromHook, props)(useCounter, 0, 10);

function HookRenderingClassPassingCustomProps({ children }: HookProps) {
  const { counter, increment, reset: resetUIHook } = useCounter(10, 50);

  return (
    <div className='counter__div_hook'>
      <h1>HOOK COUNTER VALUE: {counter}</h1>
      <button onClick={increment}>INCREMENT</button>
      {children({ resetUIHook })}
    </div>
  );
}

const WithAdvancedUsage = () =>
  withUIHook(HookRenderingClassPassingCustomProps)(ClassWithCounterHookUI);

export { WithAdvancedUsage as AdvancedClassHook };
