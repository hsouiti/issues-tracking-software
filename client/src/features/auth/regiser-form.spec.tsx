import 'whatwg-fetch';
import {render, screen, renderHook, act, getByLabelText} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {rest} from 'msw';
import {server} from '../../mocks/server';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import {renderWithProviders} from '../../utils/test/test-utils';

import {RegisterForm} from './register-form';

import InputField from '../../components/inputField';

function getElement(role: string, name?: RegExp): HTMLInputElement {
  return name
    ? screen.getByRole(role, {
        name: name,
      })
    : screen.getByRole(role);
}

const user = userEvent.setup();
// values
const nameTest = 'john doe';
const emailTest = 'test@email.com';
const passwordTest = 'passworD@1';
const confirmPasswordTest = passwordTest;

const setup = () => {
  renderWithProviders(
    <Router>
      <RegisterForm />
    </Router>
  );
  // inputs
  return {
    nameInput: getElement('textbox', /name/i),
    emailInput: getElement('textbox', /email/i) as HTMLInputElement,
    pwdInput: screen.getByLabelText('Password'),
    confrimPwdInput: getElement('password', /confirm/i),
    signUpButton: getElement('button', /sign/i),
  };
};

// inputs
describe('Register Form:', () => {
  describe('- Register Form is mounted', () => {
    it('must conatins elements : inputs (name, email, password) & button (Sign Up: disabled)', () => {
      const {emailInput, nameInput, pwdInput, confrimPwdInput, signUpButton} = setup();

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(pwdInput).toBeInTheDocument();
      expect(confrimPwdInput).toBeInTheDocument();
      // button
      expect(signUpButton).toBeInTheDocument();
      expect(signUpButton).toBeDisabled();
    });
  });

  describe('- User Interaction', () => {
    it('Enable Sign Up button When required Inputs are filled', async () => {
      const {emailInput, nameInput, pwdInput, confrimPwdInput, signUpButton} = setup();

      // enabled => Sign Up button when all fileds are filled & valid
      await user.type(nameInput, nameTest);
      await user.type(emailInput, emailTest);
      await user.type(pwdInput, passwordTest);
      await user.type(confrimPwdInput, confirmPasswordTest);
      expect(signUpButton).toBeEnabled();
    });

    it('hide errors messages for the inputs', async () => {
      const {emailInput, nameInput, pwdInput, confrimPwdInput, signUpButton} = setup();

      // hide error messages
      await user.type(nameInput, nameTest);
      expect(screen.queryByRole('name-message')).not.toBeInTheDocument();

      await user.type(emailInput, emailTest);
      expect(screen.queryByRole('email-message')).not.toBeInTheDocument();

      await user.type(pwdInput, passwordTest);
      expect(screen.queryByRole('password-message')).not.toBeInTheDocument();

      await user.type(confrimPwdInput, confirmPasswordTest);
      expect(screen.queryByRole('confirmPassword-message')).not.toBeInTheDocument();
    });

    it('show errors messages for the inputs', async () => {
      const {emailInput, nameInput, pwdInput, confrimPwdInput} = setup();

      // show error messages
      await user.type(nameInput, nameTest);
      await user.clear(nameInput);
      expect(screen.queryByRole('name-message')).toBeInTheDocument();

      await user.type(emailInput, 'wrongemail');
      expect(screen.queryByRole('email-message')).toBeInTheDocument();

      await user.type(pwdInput, 'wrongpassword');
      expect(screen.queryByRole('password-message')).toBeInTheDocument();

      await user.type(confrimPwdInput, 'wrongpassword1');
      expect(screen.queryByRole('confirmPassword-message')).toBeInTheDocument();
    });

    it.skip('Clicking Sign In && submit the login Form', async () => {
      renderWithProviders(
        <Router>
          <RegisterForm />
        </Router>
      );

      server.use(
        rest.post(`/login`, async (req, res, ctx) => {
          return res(ctx.status(400), ctx.json('Invalid Credentials'));
        })
      );

      /*  await user.type(getElement('textbox'), emailTest);
      await user.type(getElement('password'), `${passwordTest}a`);
      await user.click(getElement('button', /sign/i)); */
      // expect(getElement('password').value).toBe('');
      //expect(screen.getByText('Invalid Credentials')).toBeInTheDocument();
    });
  });
});
