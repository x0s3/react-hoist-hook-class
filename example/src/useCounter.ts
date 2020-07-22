import { useState } from 'react';

interface CounterProps {
  counter: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(
  defaultValue: number = 0,
  boostNumber: number = 1
): CounterProps {
  const [counter, setCounter] = useState<number>(defaultValue);

  const increment = () => setCounter((c) => c + boostNumber);

  const decrement = () => setCounter((c) => c - boostNumber);

  const reset = () => setCounter(0);

  return {
    counter,
    increment,
    decrement,
    reset
  };
}
