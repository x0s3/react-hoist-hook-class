import React, { useState, PureComponent } from 'react';
import { RenderHook } from '../../RenderHook';

const INCREMENT_BUTTON_TEXT = 'INCREMENT';
const INCREMENT_FROM_HOOK_BUTTON_TEXT = 'INCREMENT FROM HOOK PROP';

const useFakeCounter = (initialValue: number = 0, increaseBy: number = 1) => {
  const [counter, setCounter] = useState(initialValue);

  return {
    counter,
    increment: () => setCounter((c) => c + increaseBy)
  };
};

type FakeCounterProps = ReturnType<typeof useFakeCounter>;

type HookMixChildrenProps = { incrementFromHook: () => void };

interface CounterHookProps {
  children(): React.ReactNode;
  children(props: FakeCounterProps | HookMixChildrenProps): React.ReactNode;
}

const HookComponent = ({ children }: CounterHookProps) => {
  const { counter, increment } = useFakeCounter(0);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      {children({ counter, increment })}
    </div>
  );
};

const HookMixComponent = ({ children }: CounterHookProps) => {
  const { counter, increment } = useFakeCounter(100);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      {children({ incrementFromHook: increment })}
    </div>
  );
};

class ClassComponent extends PureComponent<FakeCounterProps> {
  render() {
    const { counter, increment } = this.props;
    return (
      <div>
        <h1>Counter: {counter}</h1>
        <button onClick={increment}>{INCREMENT_BUTTON_TEXT}</button>
      </div>
    );
  }
}

class ClassComponentWithInjectedProps extends PureComponent<
  FakeCounterProps & HookMixChildrenProps
> {
  render() {
    const { counter, increment, incrementFromHook } = this.props;
    return (
      <div>
        <h1>Counter: {counter}</h1>
        <button onClick={increment}>{INCREMENT_BUTTON_TEXT}</button>
        <button onClick={incrementFromHook}>
          {INCREMENT_FROM_HOOK_BUTTON_TEXT}
        </button>
      </div>
    );
  }
}

class ClassRenderPropsHook extends PureComponent<{
  counterValue?: number;
  incrementBy?: number;
}> {
  render() {
    const { counterValue, incrementBy } = this.props;

    return (
      <RenderHook hook={useFakeCounter} args={[counterValue, incrementBy]}>
        {({ counter, increment }) => (
          <div>
            <h1>Counter: {counter}</h1>
            <button onClick={increment}>{INCREMENT_BUTTON_TEXT}</button>
          </div>
        )}
      </RenderHook>
    );
  }
}

export {
  useFakeCounter,
  HookComponent,
  HookMixComponent,
  ClassComponent,
  ClassComponentWithInjectedProps,
  ClassRenderPropsHook,
  INCREMENT_BUTTON_TEXT,
  INCREMENT_FROM_HOOK_BUTTON_TEXT
};
