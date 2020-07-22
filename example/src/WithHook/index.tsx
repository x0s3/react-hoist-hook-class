import React, { PureComponent } from 'react';
import { withHook } from 'react-hoist-hook-class';

import { useCounter } from '../useCounter';

class CounterClassVersion extends PureComponent<ReturnType<typeof useCounter>> {
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

const WithHook = () => withHook(CounterClassVersion)(useCounter, 10, 1);

export { WithHook as ClassWithHook };
