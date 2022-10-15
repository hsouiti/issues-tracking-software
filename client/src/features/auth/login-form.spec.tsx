import {render, screen} from '@testing-library/react';
import {fireEvent, waitFor} from '@testing-library/react';
import user from '@testing-library/user-event';

import {Provider} from 'react-redux';
import {store} from '../store';

import {LoginForm} from './login-form';

function getElement(role: string, name?: RegExp): HTMLElement {
  return name
    ? screen.getByRole(role, {
        name: name,
      })
    : screen.getByRole(role);
}

describe('Authentication:', () => {
  /*
  // ** render ** //
  // check if the form 
  // contains text inputs (login / password)
  // contains login buttons & must be disabled
  */
  describe('-Login Form is mounted', () => {
    it('must conatins elements : => inputs (email, password) & button (Login: disabled)', () => {
      render(
        <Provider store={store}>
          .<LoginForm />
        </Provider>
      );

      // inputs
      expect(getElement('textbox')).toBeInTheDocument();
      expect(getElement('password')).toBeInTheDocument();

      // button
      expect(getElement('button', /sign/i)).toBeInTheDocument();
      expect(getElement('button', /sign/i)).toBeDisabled();
    });
  });
});

/*
// ** user beahvior => type & submit ** //
// disable submit button when the one of the inputs required is empty
// enable submit button when all reauired inputs have values
// ***** submitted with wrong data ****
// show/hide error messages (blur event)
// - the email/password are required 
// - the email/password inputs are validated 
// - email value should contain the proper email format
// - password should contain at least: 
     [8 characters, ...other-conditions]

*/
/* describe('- Validate form inputs', () => {
  it('name it later', async () => {
    render(<LoginForm />);
    user.click(getElement('button', /sign/i));

    await waitFor(() => expect(screen.getByTestId('message')).toHaveTextContent(/succes/i));
  });
}); */
/*
// ***** submitted with valid data ****
// - must disable the submit button while the form page
     is fetching the data
// - invalid credentials response, the form page must display
//   the error message 
// 
// ** submition succeded ** //
// Authorization
*/
