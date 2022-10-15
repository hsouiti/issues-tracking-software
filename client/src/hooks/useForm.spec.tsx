import {renderHook, act} from '@testing-library/react';
import {useForm} from './useForm';

const {result} = renderHook(() => useForm({fullName: 'test'}));

describe('Testing useForm hook', () => {
  it.only('useForm should render properly with right values', () => {
    expect(result.current).toBeDefined();
    expect(result.current.values.fullName).toBe('test');

    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: {
        name: 'fullName',
        value: 'John Doe',
      },
      writable: false,
    });

    act(() => {
      result.current.handleChange(
        event as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      );
    });

    expect(result.current.values.fullName).toBe('John Doe');

    act(() => result.current.reset());
    expect(result.current.values.fullName).toBe('test');
  });
});
