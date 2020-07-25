import React, { PureComponent } from 'react';
import { RenderHook } from 'react-hoist-hook-class';
import { useCounter } from '../useCounter';

export class ClassWithRenderProps extends PureComponent {
  render() {
    return (
      <div className='counter__div_class'>
        <RenderHook hook={useCounter}>
          {({ counter, increment, decrement, reset }) => (
            <div>
              <h1>COUNTER CLASS RENDER PROPS: {counter}</h1>
              <button type='button' onClick={increment}>
                INCREMENT
              </button>
              <button type='button' onClick={decrement}>
                DECREMENT
              </button>
              <button type='button' onClick={reset}>
                RESET
              </button>
            </div>
          )}
        </RenderHook>
      </div>
    );
  }
}
