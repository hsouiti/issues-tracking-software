import React, {useState} from 'react';

interface InputProps<T> {
  name: string;
  value: T;
  rule?: string;
}

interface ReturnValidation {
  [key: string]: string;
}

const capitalize = (word: string) => word.replace(/\b\w/g, (letter) => letter.toUpperCase());

const errorsMessages = {
  isRequired: 'is required',
  isEmail: 'You should enter a valid Email',
};

let errors: ReturnValidation = {};
function validateField<T>(input: InputProps<T>): ReturnValidation {
  const {name, value, rule} = input;

  if (rule) {
    /*
    // Check input values for rule given
    */

    // isRequired rule
    if (rule.trim().includes('isRequired')) {
      console.log(name, value);

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
  }
  return errors;
}

/*
// function to check for all required input
// and generate their errors
*/

/*
// function to generate form Inputs
*/

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputs, setInputs] = useState<InputProps<T>[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value,
      // access custom attribute 'data-rule' from event
      dataset: {rule},
    } = event.target;
    setValues({...values, [name]: value});
    setErrors(validateField({name, value, rule}));
  };

  return {
    handleChange,
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
    reset: () => {
      setValues(initialValues), setIsValid(false);
    },
  };
}
