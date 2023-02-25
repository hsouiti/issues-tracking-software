import React from 'react';

interface TextFieldProps {
  name?: string;
  type?: 'email' | 'password' | 'text' | 'number';
  value: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  label?: string;
  rule?: string;
  onChange?: (event: React.ChangeEvent<InputElement>) => void;
  styles?: React.CSSProperties;
  error?: string;
  role?: string;
  textarea?: boolean;
}

type InputElement = HTMLInputElement | HTMLTextAreaElement;
/*
// TODO: 
// Add border red in error
// Required
// 
*/

export const InputField = ({
  label,
  styles,
  error,
  rule,
  role,
  textarea = false,
  ...rest
}: TextFieldProps) => {
  const InputElement = textarea ? 'textarea' : 'input';

  return (
    <div className="form__group" style={styles}>
      <label htmlFor={rest.name} className="font-medium text-sm text-slate-700 pb-2">
        {label}
      </label>
      <InputElement
        className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm"
        role={role}
        data-rule={rule}
        {...rest}
      />

      {error && (
        <p
          role={`${rest.name}-message`}
          className="w-full px-0 mt-2 text-pink-600 text-sm flex flex-wrap justify-start gap-x-4 gap-y-2"
        >
          {error}
        </p>
      )}
    </div>
  );
};
