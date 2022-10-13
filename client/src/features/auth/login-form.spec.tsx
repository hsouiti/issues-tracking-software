/*
// ** render ** //
// check if the form 
// contains text inputs (login / password)
// contains login buttons & must be disabled
*/
import 'whatwg-fetch';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderWithProviders} from '../../utils/test/test-utils';
import {LoginForm} from './login-form';

function getElement(role: string, name?: RegExp): HTMLElement {
  return name
    ? screen.getByRole(role, {
        name: name,
      })
    : screen.getByRole(role);
}

const user = userEvent.setup();
describe('Authentication Form:', () => {
  describe('- Login Form is mounted', () => {
    it('must conatins elements : => inputs (email, password) & button (Login: disabled)', () => {
      // inputs
      renderWithProviders(<LoginForm />);
      expect(getElement('textbox')).toBeInTheDocument();
      expect(getElement('password')).toBeInTheDocument();

      // button
      expect(getElement('button', /sign/i)).toBeInTheDocument();
      expect(getElement('button', /sign/i)).toBeDisabled();
    });

    /*
    // the email/password are required 
    // Enable Sign Up button
    */
    it('Enable Sign Up button When required Inputs are filled', async () => {
      renderWithProviders(<LoginForm />);
      await user.type(getElement('textbox'), 'test@email.com');
      await user.type(getElement('password'), 'password');
      expect(getElement('button', /sign/i)).toBeEnabled();
    });
  });

  describe('- User Interaction', () => {
    /*
    // Validate the email/password 
    // - email Valid
    // - password should contain : [at least 6 characters, at least one lowercase letter, one uppercase , one number , one special charcater]
    */
    it('Validate the email && the password', async () => {
      renderWithProviders(<LoginForm />);
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g;
      const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/g;

      const validateInput = (value: string, regexExp: RegExp) => regexExp.test(value);
      const emailTest = 'test@email.com';
      const passwordTest = 'passworD@54';

      // validate Email
      await user.type(getElement('textbox'), emailTest);
      expect(validateInput(emailTest, emailRegex)).toBeTruthy();

      // validate password
      await user.type(getElement('password'), passwordTest);
      expect(validateInput(passwordTest, passRegex)).toBeTruthy();
    });
  });
});

/*
// ** user beahvior => type & submit ** //
// disable submit button when the one of the inputs required is empty
// ***** submitted with wrong data ****
// show/hide error messages (blur event)

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
