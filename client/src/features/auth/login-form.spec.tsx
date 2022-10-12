/*
// ** render ** //
// check if the form 
// contains text inputs (login / password)
// contains login buttons & must disabled
*/

import {render, screen} from '@testing-library/react';
import {fireEvent, waitFor} from '@testing-library/react';
import user from '@testing-library/user-event';

import {LoginForm} from './login-form';

function getElement(role: string, name?: RegExp): HTMLElement {
  return name
    ? screen.getByRole(role, {
        name: name,
      })
    : screen.getByRole(role);
}

describe('Authentication:', () => {
  describe('- Login Form is mounted', () => {
    it('must conatins elements : => inputs (email, password) & button (Login: disabled)', () => {
      render(<LoginForm />);

      // inputs
      expect(getElement('textbox')).toBeInTheDocument();
      expect(getElement('password')).toBeInTheDocument();

      // button
      expect(getElement('button', /sign/i)).toBeInTheDocument();
      expect(getElement('button', /sign/i)).toBeDisabled();
    });
  });
});
