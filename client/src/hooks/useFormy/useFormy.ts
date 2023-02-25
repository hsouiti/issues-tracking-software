// https://github.com/hts-digital-solutions/hts-react-form/tree/main/src
// https://trishalim.com/blog/react-how-to-create-a-reusable-form-using-react-context\
// https://omkarkulkarni.vercel.app/blog/reusable-form-component-in-react-using-react-hook-form-and-zod
// https://www.justjeb.com/post/custom-react-hooks-why-do-we-need-a-context

// https://github.com/hunelDev/reactjs-forms

//https://you.com/search?q=createContext+inside+custom+Hook&fromSearchBar=true

// https://www.youtube.com/watch?v=nTQ-PfUqDvM&t=1s

/* NPM Package
- https://snyk.io/blog/best-practices-create-modern-npm-package/
*/
import React, {useState, useEffect, useCallback} from 'react';
import {useField} from './utils';
import Field from './components/Field';

import {FormContext} from './formComtext';

interface Error {
  [key: string]: string;
}

export function useFormy() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState<Error>({});
  const [isValid, setIsValid] = useState(false);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        name,
        value,
        // access custom attribute 'data-rule' from event
        dataset: {rule},
      } = event.target;

      setValues({...values, [name]: value});
    },
    [values]
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      // submitForm();
      setIsValid(false);
    }
  };

  /*   return (<FormContext.Provider value={{
        values,
        onChange
      }}>
        {children}
      </FormContext.Provider>
 )*/

  return {values, onSubmit, isValid};
}
