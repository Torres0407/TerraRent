import { RefObject, useEffect } from 'react';

/**
 * useClickOutside Hook
 * Detects clicks outside of a specified element.
 * Useful for closing dropdowns, modals, or popups.
 * 
 * @param ref - React ref object pointing to the element
 * @param handler - Callback function to execute on outside click
 * @param enabled - Whether the hook is active (default: true)
 * 
 * @example
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * useClickOutside(dropdownRef, () => setIsOpen(false));
 * 
 * <div ref={dropdownRef}>
 *   {isOpen && <DropdownMenu />}
 * </div>
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}

export default useClickOutside;