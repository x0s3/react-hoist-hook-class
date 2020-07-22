import React from 'react';
import { ClassWithUIHook } from './WithUIHook';
import { ClassWithHook } from './WithHook';
import { AdvancedClassHook } from './WithAdvancedUsage';

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
    </div>
  );
}
