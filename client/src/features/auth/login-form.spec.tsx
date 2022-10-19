import 'whatwg-fetch';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderWithProviders} from '../../utils/test/test-utils';
import {LoginForm} from './login-form';
import {BrowserRouter as Router, Routes} from 'react-router-dom';

function getElement(role: string, name?: RegExp): HTMLElement {
  return name
    ? screen.getByRole(role, {
        name: name,
      })
    : screen.getByRole(role);
}

const user = userEvent.setup();
const emailTest = 'test@email.com';
const passwordTest = 'passworD@1';
describe('Authentication Form:', () => {
  describe('- Login Form is mounted', () => {
    /*
    // ** render ** //
    // check if the form 
    // contains text inputs (login / password)
    // contains login buttons & must be disabled
    */
    it('must conatins elements : => inputs (email, password) & button (Login: disabled)', () => {
      // inputs
      renderWithProviders(
        <Router>
          <LoginForm />
        </Router>
      );
      expect(getElement('textbox')).toBeInTheDocument();
      expect(getElement('password')).toBeInTheDocument();

      // button
      expect(getElement('button', /sign/i)).toBeInTheDocument();
      expect(getElement('button', /sign/i)).toBeDisabled();
    });
  });

  describe('- User Interaction', () => {
    /*
    // Validate the email/password 
    //  Email && password souldn't be empty 
    // - email Valid
    // - password should contain : [at least 6 characters, at least one lowercase letter, one uppercase , one number , one special charcater]
    */

    it('Enable Sign Up button When required Inputs are filled', async () => {
      renderWithProviders(
        <Router>
          <LoginForm />
        </Router>
      );

      // enabled => Sign In button when all fileds are filled & valid
      await user.type(getElement('textbox'), emailTest);
      await user.type(getElement('password'), passwordTest);
      expect(getElement('button', /sign/i)).toBeEnabled();
    });

    it('Disable Sign Up button When required Inputs are missing or invalid', async () => {
      renderWithProviders(
        <Router>
          <LoginForm />
        </Router>
      );

      // Diasbled Sign In Button => When required fields are missing
      await user.clear(getElement('textbox'));
      await user.clear(getElement('password'));
      expect(getElement('button', /sign/i)).toBeDisabled();

      // Disable Sign Button => required fields are invalid
      await user.type(getElement('textbox'), 'wrongemail');
      await user.type(getElement('password'), 'wrongpass');
      expect(getElement('button', /sign/i)).toBeDisabled();
    });

    it('check errors messages for the email && the password', async () => {
      renderWithProviders(
        <Router>
          <LoginForm />
        </Router>
      );

      await user.type(getElement('textbox'), 'wrongemail');
      await user.type(getElement('password'), 'wrongpassword');
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByRole('password-message')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByRole('email-message')).toBeInTheDocument();

      // enabled => Sign In button when all fileds are filled & valid
      await user.type(getElement('textbox'), emailTest);
      await user.type(getElement('password'), passwordTest);
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByRole('password-message')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByRole('email-message')).not.toBeInTheDocument();
    });

    it('Clicking Sign In && submit the login Form', async () => {
      renderWithProviders(
        <Router>
          <LoginForm />
        </Router>
      );
      const failureMessage = 'Invalid Credentails';
      /*   const success = {
        user: {
          name: 'John',
          email: 'john@gmail.com',
          role: 'admin',
        },
        token: 'eyyhdfjdfd12dfd',
      }; */

      await user.type(getElement('textbox'), emailTest);
      await user.type(getElement('password'), `${passwordTest}a`);

      await user.click(getElement('message'));
      expect(getElement('message')).toHaveTextContent(failureMessage);
    });
  });
});

/*
// ** user beahvior => type & submit ** //
// disable submit button when the one of the inputs required is empty
// ***** submitted with wrong data ****
// show/hide error messages (blur event)


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
