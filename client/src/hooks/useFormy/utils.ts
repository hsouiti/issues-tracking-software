/*
  customization: 
  {
    label: boolean,
    container: booleaan,
    customClass: string,
    styles: styles css
  }

  if(container)
  <div className= {customClass} style={styles}>
  switch type (input)
    type ? 
    <input type={type} name = {} > :
    type= 'select' ? goes here : type='checkbox' ? goes here
  default:
    <input type=type
  </div>

*/

// {...register('name', { required: true, maxLength: 30 })}
// https://final-form.org/docs/react-final-form/api/Field
// renderElement

/*


export function useField<
  FieldValue = any,
  T extends HTMLElement = HTMLElement,
  InputValue = FieldValue
>(
  name: string,
  config?: UseFieldConfig<FieldValue, InputValue>
): FieldRenderProps<FieldValue, T, InputValue>;


export const Field: <
  FieldValue = any,
  T extends HTMLElement = HTMLElement,
  InputValue = FieldValue,
  RP extends FieldRenderProps<FieldValue, T, InputValue> = FieldRenderProps<
    FieldValue,
    T,
    InputValue
  >
>(
  props: FieldProps<FieldValue, RP, T, InputValue>
) => React.ReactElement;
*/

/*

  {
    "label": "Email Address",
    "name": "email",
    "placeholder": "Enter your email",
    "type": "email",
    "validate": {
      "required": true,
      "maxLength": 30
    },
    "styles": {
      "label": true,
      "container": true,
      "customClass": "form-input",
      "styles": ""
    }
  }

*/

import React from 'react';
export const generateField = (params: any) => {
  console.log('params', params);
  // generate logic goes here
};

export const validateField = (params: any) => {
  console.log('validate', params);
  // validate logic goes here
};
export const useField = (input: any) => {
  //console.log(input);

  const {validate, ...rest} = input;
  generateField(rest);
  validateField(validate);
  return {};
};

/*:  <
FieldValue = any,
T extends HTMLElement = HTMLElement,
InputValue = FieldValue,
RP extends FieldRenderProps<FieldValue, T, InputValue> = FieldRenderProps<
FieldValue,
T,
InputValue
>
> */
