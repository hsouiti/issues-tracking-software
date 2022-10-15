import React, {useState} from 'react';

interface customProps {
  formState: any;
}

interface ArgumentProps<T> {
  name: string;
  value: T;
  rule?: string;
}

interface ReturnValidation {
  [key: string]: string;
}

const capitalize = (word: string) => word.replace(/\b\w/g, (letter) => letter.toUpperCase());

export const errorsMessages = {
  isRequired: 'is required',
  isEmail: 'You should enter a valid Email',
};

function validateField<T>(input: ArgumentProps<T>): any {
  let errors: ReturnValidation = {};
  const {name, value, rule} = input;

  if (rule) {
    /*
    // Check input values for rule given
    */
    console.log('here', name, value, rule);

    // isRequired rule
    if (rule.trim().includes('isRequired')) {
      if (value === '') {
        errors = {
          ...errors,
          // add error dynamically from the predefined messages
          [name]: `${capitalize(name.replace('_', ' '))} ${errorsMessages['isRequired']}`,
        };
      } else {
        // remove the error form the errors object
        delete errors[`${name}`];
      }
    }
  }
  console.log('err', errors);

  return errors;
}

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
    reset: () => {
      setValues(initialValues), setIsValid(false);
    },
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        name,
        value,
        // access custom attribute 'data-rule' from event
        dataset: {rule},
      } = event.target;
      setValues({...values, [name]: value});
      setErrors(validateField({name, value, rule}));
      // setIsValid(Object.keys(validateFormInput({name, value, rule})).length === 0);
    },
  };
}
