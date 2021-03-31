import React from 'react';
import './FormsControls.scss';

const FormControl = ({input, meta, ...props}) => {
  const hasError = meta.error && meta.touched;
  return (
    <div className={'input ' + (hasError? 'input_error':'')}>
      {props.children}
      {hasError && <span className='error_text'>{meta.error}</span>}
    </div>

  );
};

export const Input = React.forwardRef((props, ref) => {
  return <FormControl {...props}><input ref={ref} {...props.input} {...props}/></FormControl>;
});

export const Button = (props) =>{
  return <button className='button'>{props.children}</button>;
};
