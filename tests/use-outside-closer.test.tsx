import { renderHook } from '@testing-library/react';
import useOutsideCloser from '../hooks/use-outside-closer';

describe('useOutsideCloser', () => {
  it('calls the callback when clicking outside the ref', () => {
    const callback = jest.fn();
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useOutsideCloser(ref, callback));

    const event = new MouseEvent('mousedown', { bubbles: true });
    document.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });

  it('does not call the callback when clicking inside the ref', () => {
    const callback = jest.fn();
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useOutsideCloser(ref, callback));

    const event = new MouseEvent('mousedown', { bubbles: true });
    ref.current.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });
});
