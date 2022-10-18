import React from 'react';
import {BiCheck} from 'react-icons/bi';

interface TextFieldProps {
  name?: string;
  type?: 'email' | 'password' | 'text';
  value: string;
  placeholder?: string;
  label?: string;
  rule?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  styles?: React.CSSProperties;
  error?: string;
  role?: string;
  textarea?: boolean;
}

const TextField = ({label, styles, error, rule, role, textarea, ...rest}: TextFieldProps) => {
  const InputElement = textarea ? 'textarea' : 'input';

  return (
    <div className="form__group" style={styles}>
      <label htmlFor="password">
        <p className="font-medium text-sm text-slate-700 pb-2">{label}</p>

        <InputElement
          role={role}
          data-rule={rule}
          className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
          {...rest}
        />

        {error && (
          <p
            role={role}
            className="w-full px-0 mt-2 text-pink-600 text-sm flex flex-wrap justify-start gap-x-4 gap-y-2"
          >
            {error}
            {/*    {error.split('|').map((el) => {
              return (
                <span className="inline-block flex" key={el}>
                  <BiCheck /> {el}
                </span>
              );
            })} */}
          </p>
        )}
      </label>
    </div>
  );
};

export default TextField;
