import React, {useState, useEffect} from 'react';

interface InputProps<T> {
  name: string;
  value: T;
  rule?: string;
}

interface Error {
  [key: string]: string;
}
const validateEmail = (email: string) => {
  return new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(email);
};

const validatePassword = (password: string) => {
  return new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/g).test(
    password
  );
};

const capitalize = (word: string) => word.replace(/\b\w/g, (letter) => letter.toUpperCase());

interface IsPasswordType {
  [key: string]: string | boolean;
}
const errorsMessages: {
  isRequired: string;
  isEmail: string;
  isPassword: string;
} = {
  isRequired: 'is required',
  isEmail: 'You should enter a valid Email',
  isPassword: 'Min 6 characters | Uppercase | Lowercase | Number | Special character',
  /*  isPassword: {
    minLen: 'Min 6 characters',
    uppercase: true,
    lowercase: true,
    number: true,
    special: true,
  }, */
};

let errors: Error = {};
export function validateField<T>(input: InputProps<T>): Error {
  const {name, value, rule} = input;

  if (rule) {
    /*
    // Check input values for rule given
    */

    // isRequired rule
    if (rule.trim().includes('isRequired')) {
      if (value === '') {
        errors = {
          ...errors,
          // add error dynamically from the predefined messages
          [name]: `${capitalize(name)} ${errorsMessages['isRequired']}`,
        };
      } else {
        // remove the error form the errors object
        delete errors[`${name}`];
      }
    }

    // isEmail rule
    if (rule.trim().includes('isEmail')) {
      if (typeof value === 'string' && !validateEmail(value.trim())) {
        errors = {
          ...errors,
          [name]: errorsMessages['isEmail'],
        };
      } else {
        delete errors[`${name}`];
      }
    }

    // isPassword rule
    if (rule.trim().includes('isPassword')) {
      console.log('errors message', errorsMessages['isPassword']);

      if (
        typeof value === 'string' &&
        (value.trim().length < 6 || !validatePassword(value.trim()))
      ) {
        errors = {
          ...errors,
          [name]: `${errorsMessages['isPassword']}`,
        };
      } else {
        delete errors[`${name}`];
      }
    }
  }

  return errors;
}

/*
// TODO:
// function to generate form Inputs
*/

export function useForm<T>(
  initialState: {name: string; rule: string}[],
  submitForm: () => Promise<void>
) {
  /*
  // function to check for all field with rule validation
  // and generate their errors on mount
  */
  function checkInputs() {
    initialState.map((input) => {
      if (input.rule) {
        validateField({...input, value: ''});
      }
    });
  }

  // get InitialValues
  const getInitialValues = (initial: any[]) => {
    const inputss = {};

    function reducer(previousValue: any, currentValue: any, index: any): any {
      const {name: prevName} = previousValue;
      const {name: curName} = currentValue;

      return {[prevName]: '', [curName]: ''};
    }

    const values = initial.reduce(reducer);
    return values;
  };

  const [values, setValues] = useState(getInitialValues(initialState));

  const [errors, setErrors] = useState<Error>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value,
      // access custom attribute 'data-rule' from event
      dataset: {rule},
    } = event.target;
    setValues({...values, [name]: value});
    setErrors(validateField({name, value, rule}));
    setIsValid(Object.keys(validateField({name, value, rule})).length === 0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    checkInputs();
    event.preventDefault();
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      submitForm();
      setIsValid(false);
    }
  };
  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    reset: () => {
      setValues(getInitialValues(initialState)), setIsValid(false);
    },
  };
}
