import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import TextField from '.';

const user = userEvent.setup();

describe('Testing the TxetField Component', () => {
  render(<TextField value="test" />);
  it('first test', () => {
    console.log('test goes here');
  });
});
