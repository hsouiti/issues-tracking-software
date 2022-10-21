import {renderHook, act} from '@testing-library/react';
import {useForm} from './useForm';

import {expect, jest, test} from '@jest/globals';
import {validateField} from './useForm';

const {result} = renderHook(() => useForm({fullName: 'test'}));
describe('Testing useForm hook', () => {
  it('useForm should render properly with right values', () => {
    expect(result.current).toBeDefined();
    expect(result.current.values.fullName).toBe('test');

    //
    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: {
        name: 'fullName',
        value: 'John Doe',
        dataset: 'isRequired',
      },
      writable: false,
    });

    act(() => {
      result.current.handleChange(
        event as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      );
    });

    expect(result.current.values.fullName).toBe('John Doe');

    //
    act(() => result.current.reset());
    expect(result.current.values.fullName).toBe('test');
  });

  /*   it('useForm should show errors properly with right', () => {
    //
    const mockValidate = jest.fn<typeof validateField>();

    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: {
        name: 'fullName',
        value: '',
        dataset: 'isRequired',
      },
      writable: false,
    });

    act(() => {
      result.current.handleChange(
        event as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      );
    });
    const errorsTest = {fullName: 'fullName is required'};
    expect(result.current.errors).toContainEqual(errorsTest);
  }); */
});
