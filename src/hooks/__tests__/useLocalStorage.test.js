import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'test-key';
  const initialValue = 'initial';

  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  it('returns the stored value when localStorage has data', () => {
    localStorage.setItem(key, JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toBe('stored');
  });

  it('updates localStorage when the state changes', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]('updated');
    });

    expect(localStorage.getItem(key)).toBe(JSON.stringify('updated'));
    expect(result.current[0]).toBe('updated');
  });

  it('handles JSON.parse errors gracefully', () => {
    localStorage.setItem(key, 'invalid-json');
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  it('handles localStorage.setItem errors gracefully', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    setItemSpy.mockRestore();
  });

  it('returns the same setter function on re-renders', () => {
    const { result, rerender } = renderHook(() => useLocalStorage(key, initialValue));
    const initialSetter = result.current[1];

    rerender();
    expect(result.current[1]).toBe(initialSetter);
  });

  it('updates state when storage event is triggered', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: JSON.stringify('new-value')
      }));
    });

    expect(result.current[0]).toBe('new-value');
  });

  it('does not update state when storage event is for different key', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'different-key',
        newValue: JSON.stringify('new-value')
      }));
    });

    expect(result.current[0]).toBe(initialValue);
  });

  it('handles storage event with null newValue', () => {
    localStorage.setItem(key, JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: null
      }));
    });

    expect(result.current[0]).toBe(initialValue);
  });
});