import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ClassComponent,
  ClassComponentWithInjectedProps,
  HookComponent,
  HookMixComponent,
  useFakeCounter,
  INCREMENT_BUTTON_TEXT,
  INCREMENT_FROM_HOOK_BUTTON_TEXT
} from './utils';

import { withHook, withUIHook } from '../';

// HOOK-UI
const renderHookUIClassComponent = () =>
  render(withUIHook(HookComponent)(ClassComponent));

// HOOK
const ClassComponentCounterHook = () =>
  withHook(ClassComponent)(useFakeCounter, 5, 10);
const renderHookClassComponent = () => render(<ClassComponentCounterHook />);

// ADVANCED USAGE
const ClassWithCounterHookUI = (props: any) =>
  withHook(ClassComponentWithInjectedProps, props)(useFakeCounter, 0, 10);
const WidthAdvancesUsage = () =>
  withUIHook(HookMixComponent)(ClassWithCounterHookUI);
const renderAdvancedUsage = () => render(<WidthAdvancesUsage />);

describe('React-Hoist-Hook-Class', () => {
  describe('[WITH-UI-HOOK]', () => {
    it('renders with injected props', () => {
      // it renders hook component with class as a children component
      // passing custom hook props to class
      renderHookUIClassComponent();

      // it expects to see hook & class rendering counter value, with the same value equals to 0 (defaultValue)
      expect(screen.getAllByText('Counter: 0')).toHaveLength(2);

      const incrementClassButton = screen.getByText(INCREMENT_BUTTON_TEXT);

      // it clicks `INCREMENT` buttom from class component and increase counter value by 1
      userEvent.click(incrementClassButton);

      // it expects to see hook & class rendering counter value, with the same value equals to 1
      expect(screen.getAllByText('Counter: 1')).toHaveLength(2);
    });
  });

  describe('[WITH-HOOK]', () => {
    it('renders with injected props', () => {
      // it renders hook component with class as a children component
      // passing custom hook props to class
      renderHookClassComponent();

      // it expects to see class rendering counter value, with value equals to 5 (defaultValue)
      expect(screen.getByText('Counter: 5')).toBeInTheDocument();

      const incrementClassButton = screen.getByText(INCREMENT_BUTTON_TEXT);

      // it clicks `INCREMENT` buttom from class component and increase counter value by 10
      userEvent.click(incrementClassButton);

      // it expects to see class rendering counter value, with value equals to 15
      expect(screen.getByText('Counter: 15')).toBeInTheDocument();
    });
  });

  describe('[ADVANCED USAGE - WITH-UI-HOOK & WITH-HOOK]', () => {
    it('renders with custom hook and injected props', () => {
      // it renders hook component with class as a children component
      // passing custom hook props to class and injected props
      renderAdvancedUsage();

      // it expects to see class & hook rendering counter value, with values equals to 0 - 100 (defaultValues)
      ['Counter: 100', 'Counter: 0'].forEach((text) => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });

      const incrementClassButton = screen.getByText(INCREMENT_BUTTON_TEXT);
      const incrementHookButton = screen.getByText(
        INCREMENT_FROM_HOOK_BUTTON_TEXT
      );

      // it clicks `INCREMENT` buttom from class component and increase counter value by 10
      userEvent.click(incrementClassButton);

      // it clicks `INCREMENT FROM HOOK PROP` buttom from class component and increase hook counter value by 1
      userEvent.click(incrementHookButton);

      // it expects to see class rendering counter value, with value equals to 10
      expect(screen.getByText('Counter: 10')).toBeInTheDocument();

      // it expects to see hook rendering counter value, with value equals to 101
      expect(screen.getByText('Counter: 101')).toBeInTheDocument();
    });
  });
});
