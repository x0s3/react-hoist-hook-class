import React from 'react';
import { ClassWithUIHook } from './WithUIHook';
import { ClassWithHook } from './WithHook';
import { AdvancedClassHook } from './WithAdvancedUsage';
import { ClassWithRenderProps } from './RenderHook';

export default function App() {
  return (
    <div className='counter__div_root_example'>
      <h1>EXAMPLE USING CLASS INSIDE A UI HOOK:</h1>
      <ClassWithUIHook />
      <hr />
      <h1>EXAMPLE USING HOOK INSIDE A CLASS:</h1>
      <ClassWithHook />
      <hr />
      <h1>EXAMPLE USING ADVANCED USAGE:</h1>
      <AdvancedClassHook />
      <hr />
      <h1>EXAMPLE USING RENDER PROPS:</h1>
      <ClassWithRenderProps />
    </div>
  );
}
