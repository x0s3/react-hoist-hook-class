import React, { PureComponent } from 'react';
import { withUIHook } from 'react-hoist-hook-class';

import { useCounter } from '../useCounter';

type CounterHook = ReturnType<typeof useCounter>;

interface CounterHookProps {
  children(): React.ReactNode;
  children(props: CounterHook): React.ReactNode;
}

function CounterHookSharedVersion({ children }: CounterHookProps) {
  const { counter, increment, decrement, reset } = useCounter(0);

  return (
    <div className='counter__div_hook'>
      <h1>COUNTER HOOK COMPONENT SHARED VALUE: {counter}</h1>
      {children({ counter, increment, decrement, reset })}
    </div>
  );
}

class CounterClassSharedVersion extends PureComponent<CounterHook> {
  render() {
    const { counter, increment, decrement, reset } = this.props;

    return (
      <div className='counter__div_class'>
        <h1>CLASS SHARED COUNTER VALUE: {counter}</h1>
        <button onClick={increment}>INCREMENT</button>
        <button onClick={decrement}>DECREMENT</button>
        <button onClick={reset}>RESET</button>
      </div>
    );
  }
}

const WithUIHook = () =>
  withUIHook(CounterHookSharedVersion)(CounterClassSharedVersion);

export { WithUIHook as ClassWithUIHook };
