import {useContext} from 'react';
import FormContext from '../formComtext';

const formComtext = useContext(FormContext);

const {values, handleChnage} = formComtext;

const Field = ({label, type, name, ...rest}: any) => {
  //
  // return field according to
  // @type = input
  //
  if (type === 'email' || type === 'number' || type === ' text') {
    return (
      <>
        {label && <label htmlFor={name}>{label}</label>}
        <input id={name} type={type} value={values[name]} onChange={handleChnage} {...rest} />;
      </>
    );
  }
};

export default Field;
