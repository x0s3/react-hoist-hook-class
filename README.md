# react-hoist-hook-class

> Don't refactor your code, just install this library 😁

[![NPM](https://img.shields.io/npm/v/react-hoist-hook-class.svg)](https://www.npmjs.com/package/react-hoist-hook-class) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## ⚙️ Install

npm:

```bash
npm install --save react-hoist-hook-class
```

yarn:

```bash
yarn add react-hoist-hook-class
```

## 🧪 What is this library for?

This library makes hook and class interoperability smooth, written in TypeScript, fully typed to ensure each component expects its right props 🎯

(Works with React & React-Native, no external libraries needed 🚀)

## 🧬 Exported methods

### RenderHook

It uses a render props pattern that helps you to use <code>hooks</code> inside Class component.

#### How it works?

- RenderHook will render hook props into your class component, this component allows to be more flexible while using hooks

example:

```tsx
import React, { PureComponent } from 'react';
import { View, Text, Pressable } from 'react-native';
import { RenderHook } from 'react-hoist-hook-class';

class ClassRenderHook extends PureComponent {
  render() {
    return (
      <RenderHook hook={useXXX} args={[ARGUMENTS_TO_PASS_TO_THE_HOOK]}>
        {({ returned, values, from, hook }) => (
          <View>
            <Text>
              YOUR CODE: {returned} - {values}
            </Text>
            <Pressable onPress={from}>
              <Text>Your custom {hook}</Text>
            </Pressable>
          </View>
        )}
      </RenderHook>
    );
  }
}
```

### withHook

Inject returned values from a custom hook into your class props

#### How it works?

- `withHook` accepts 2 functions
  - First one accepts a `Class component` as a **first** argument, second and beyond can be props to be injected.
  - Second one accepts a `hook` as a **first** argument, second and beyond can be hooks arguments.

example:

```tsx
import React, { PureComponent, useEffect, useState } from 'react';
import { View } from 'react-native';
import { withHook } from 'react-hoist-hook-class';

function useWhatever(defaultValue: any) {
  const [whatever, setWhatever] = useState<any>(defaultValue);

  useEffect(() => {
    setInterval(setWhatever, 3000, defaultValue);
  }, [defaultValue]);

  return {
    whatever,
    setWhatever
  };
}

class ClassComponent extends PureComponent<ReturnType<typeof useWhatever>> {
  componentDidMount() {
    setInterval(this.props.setWhatever, 5000, 'For Ever');
  }

  render() {
    const { date } = this.props;

    return (
      <View>
        <Text>Current date: {date}</Text>
      </View>
    );
  }
}

// export const ClassUsingHook = ([props]) => withHook(ClassComponent [, props])(useHook [, args]);
export const ClassUsingHook = () =>
  withHook(ClassComponent)(useWhatever, 'Not For Ever');
```

### withUIHook

Inject Class component as a <code>children</code> to your function component in order to pass custom props to it

#### How it works?

- First function accepts your `hook component` and the second one your `class component`

example:

```tsx
import React, { PureComponent } from 'react';
import { withUIHook } from 'react-hoist-hook-class';

// don't forget to overload children prop if you are using TS :)
interface ComponentProps {
  children(): React.ReactNode;
  children(props: YourProps): React.ReactNode;
}

function FunctionComponent({ children }: ComponentProps) {
  const [anyState, setAnyState] = useState<any>();

  const handleAnyStateAction = (whatever: any) => {
    setAnyState(whatever);
  };

  return (
    <div>
      <h1>Hello from function component! :) {anyState}</h1>
      {children({ handleAnyStateAction })}
    </div>
  );
}

class ClassComponent extends PureComponent<YourProps, YourState> {
  constructor(props: YourProps) {
    super(props);
    this.state = {
      yourStringState: 'Hello from class state! :)'
    };
  }

  doClassThings = () => {
    const { handleAnyStateAction: hookAction } = this.props;

    hookAction(this.state.yourStringState);
  };

  render() {
    return (
      <div>
        <button onClick={this.doClassThings}>Do something</button>
      </div>
    );
  }
}

export const HookRenderingClass = () =>
  withUIHook(FunctionComponent)(ClassComponent);
```

## 🤹‍♂️ Visual example (GIF)

![ExampleHoistHookClass](./assets/example.gif)

## 👨‍💻 Basic usage (render props)

### RenderHook (no args)

```tsx
import React, { PureComponent, useState } from 'react';
import { RenderHook } from 'react-hoist-hook-class';

function useCounter(defaultCounter: number = 0, boost: number = 1) {
  const [counter, setCounter] = useState<number>(defaultCounter);

  return {
    counter,
    increment: () => setCounter((c) => c + boost),
    decrement: () => setCounter((c) => c - boost),
    reset: () => setCounter(0)
  };
}

export class ClassWithRenderProps extends PureComponent {
  render() {
    return (
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
    );
  }
}
```

### RenderHook (with args)

> If there are no more options, you can use `bind` to bind arguments to the hook

```tsx
import React, { PureComponent, useState } from 'react';
import { RenderHook } from 'react-hoist-hook-class';

function useCounter(
  defaultCounter: number = 0,
  {
    incrementBy = 1,
    decrementBy = 1
  }: { incrementBy?: number; decrementBy?: number } = {}
) {
  const [counter, setCounter] = useState<number>(defaultCounter);

  return {
    counter,
    increment: () => setCounter((c) => c + incrementBy),
    decrement: () => setCounter((c) => c - decrementBy),
    reset: () => setCounter(0)
  };
}

export class ClassWithRenderProps extends PureComponent {
  render() {
    return (
      <RenderHook
        hook={useCounter}
        args={[10, { incrementBy: 10, decrementBy: 5 }]}
      >
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
    );
  }
}
```

## 👩‍💻 Basic usage (hocs)

### withHook

```tsx
import React, { PureComponent, useState } from 'react';
import { withHook } from 'react-hoist-hook-class';

function useCounter(defaultCounter: number = 0, boost: number = 1) {
  const [counter, setCounter] = useState<number>(defaultCounter);

  return {
    counter,
    increment: () => setCounter((c) => c + boost),
    decrement: () => setCounter((c) => c - boost),
    reset: () => setCounter(0)
  };
}

type ClassProps = ReturnType<typeof useCounter>;

class ClassCounterHook extends PureComponent<ClassProps> {
  render() {
    const { counter, increment, decrement, reset } = this.props;

    return (
      <div>
        <h1>CLASS COUNTER VALUE: {counter}</h1>
        <button onClick={increment}>INCREMENT</button>
        <button onClick={decrement}>DECREMENT</button>
        <button onClick={reset}>RESET</button>
      </div>
    );
  }
}

export const ExampleWithHook = () =>
  withHook(ClassCounterHook)(useCounter, 10, 20);
```

### withUIHook

```tsx
import React, { PureComponent, useState } from 'react';
import { withUIHook } from 'react-hoist-hook-class';

function useCounter(defaultCounter: number = 0, boost: number = 1) {
  const [counter, setCounter] = useState<number>(defaultCounter);

  return {
    counter,
    increment: () => setCounter((c) => c + boost),
    decrement: () => setCounter((c) => c - boost),
    reset: () => setCounter(0)
  };
}

type ClassProps = ReturnType<typeof useCounter>;

interface CounterHookProps {
  children(): React.ReactNode;
  children(props: ClassProps): React.ReactNode;
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

class CounterClassSharedVersion extends PureComponent<ClassProps & OtherProps> {
  render() {
    const { counter, increment, decrement, reset } = this.props;

    return (
      <div>
        <h1>CLASS SHARED COUNTER VALUE: {counter}</h1>
        <button onClick={increment}>INCREMENT</button>
        <button onClick={decrement}>DECREMENT</button>
        <button onClick={reset}>RESET</button>
      </div>
    );
  }
}

export const ClassWithUIHook = () =>
  withUIHook(CounterHookSharedVersion)(CounterClassSharedVersion);
```

### Advanced usage

```tsx
import React, { PureComponent, useState } from 'react';
import { withHook, withUIHook } from 'react-hoist-hook-class';

function useCounter(defaultCounter: number = 0, boost: number = 1) {
  const [counter, setCounter] = useState<number>(defaultCounter);

  return {
    counter,
    increment: () => setCounter((c) => c + boost),
    decrement: () => setCounter((c) => c - boost),
    reset: () => setCounter(0)
  };
}

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
      <div>
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
    <div>
      <h1>HOOK COUNTER VALUE: {counter}</h1>
      <button onClick={increment}>INCREMENT</button>
      {children({ resetUIHook })}
    </div>
  );
}

export const AdvancedUsage = () =>
  withUIHook(HookRenderingClassPassingCustomProps)(ClassWithCounterHookUI);
```

## License

MIT © [x0s3](https://github.com/x0s3)
