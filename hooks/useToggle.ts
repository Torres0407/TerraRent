import { useCallback, useState } from 'react';

/**
 * useToggle Hook
 * Manages boolean state with toggle functionality.
 * Useful for modals, dropdowns, visibility states, etc.
 * 
 * @param initialValue - Initial boolean value (default: false)
 * @returns [value, toggle, setTrue, setFalse, setValue] tuple
 * 
 * @example
 * const [isOpen, toggle, open, close] = useToggle(false);
 * 
 * <button onClick={toggle}>Toggle Modal</button>
 * <button onClick={open}>Open Modal</button>
 * <button onClick={close}>Close Modal</button>
 * {isOpen && <Modal />}
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, () => void, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse, setValue];
}

export default useToggle;