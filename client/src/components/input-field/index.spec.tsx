import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import InputField from './index';

const user = userEvent.setup();

const baseProps = {
  name: 'mockName',
  value: '',
  label: 'mockLabel',
  'data-testid': 'mockInput',
  onChange: jest.fn(),
  error: 'something went wrong',
};
const setupInput = (props: any) => {
  render(<InputField {...props} />);
  const input = screen.getByTestId('mockInput') as HTMLInputElement;
  return {input};
};

describe('Testing the InputField Component', () => {
  it('should render', () => {
    const {input} = setupInput(baseProps);
    expect(input).toBeInTheDocument();
    expect(screen.getByText('mockLabel')).toBeInTheDocument();
    expect(screen.getByRole('mockName-message')).toBeInTheDocument();
  });

  it('should change value', async () => {
    const newProps = {...baseProps, value: 'mockValue'};
    const {input} = setupInput(newProps);
    expect(input.value).toBe('mockValue');
  });
});
