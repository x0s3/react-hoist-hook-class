import React from 'react';
import { render } from '@testing-library/react';
import {
  HookComponent,
  ClassComponent,
  ClassComponentWithInjectedProps,
  HookMixComponent,
  useFakeCounter,
  ClassRenderPropsHook
} from './utils';
import { withHook, withUIHook } from '../../';

// HOOK-UI
const ClassComponentUIHook = () => withUIHook(HookComponent)(ClassComponent);
const renderClassComponentUIHook = () => render(<ClassComponentUIHook />);

// HOOK
const ClassComponentCounterHook = () =>
  withHook(ClassComponent)(useFakeCounter, 5, 10);
const renderClassComponentCounterHook = () =>
  render(<ClassComponentCounterHook />);

// ADVANCED USAGE
const ClassWithCounterHookUI = (props: any) =>
  withHook(ClassComponentWithInjectedProps, props)(useFakeCounter, 0, 10);
const WidthAdvancesUsage = () =>
  withUIHook(HookMixComponent)(ClassWithCounterHookUI);
const renderWidthAdvancesUsage = () => render(<WidthAdvancesUsage />);

// RENDER PROPS
const renderClassRenderProps = (counterValue?: number, incrementBy?: number) =>
  render(
    <ClassRenderPropsHook
      counterValue={counterValue}
      incrementBy={incrementBy}
    />
  );

export {
  renderWidthAdvancesUsage,
  renderClassComponentCounterHook,
  renderClassComponentUIHook,
  renderClassRenderProps
};
