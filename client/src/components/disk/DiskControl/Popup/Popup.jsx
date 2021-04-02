import React from 'react';
import '../diskControl.scss';
import {Field, Form} from 'react-final-form';
import {required} from '../../../../utills/validators/validators';
import {Button, Input} from '../../../common/FormsControls/FormsControls';
import {createDir, setPopupDisplay} from '../../../../reducers/fileReducer';
import {useDispatch} from 'react-redux';

const Popup = () => {
  const dispatch = useDispatch();
  return (
    <div className='disk-control-popup' onClick={()=>dispatch(setPopupDisplay(false))}>
      <div className='disk-control-popup__content' onClick={(e)=>e.stopPropagation()}>
        <h2>Create directory</h2>
        <div className='disk-control-popup__input'>
          <Form onSubmit ={ async (value) => dispatch(createDir(value.name))} render={
            ({submitError, handleSubmit, submitting}) => {
              return <form onSubmit={handleSubmit}>
                <Field className='form__field' validate={required} placeholder={'Enter name ...'} name={'name'} component={Input} />
                <div className='form__submit-error'>
                  {submitError && <div>{submitError}</div>}
                </div>
                <div className='form__button'>
                  <Button type='submit' disabled={submitting}>Create</Button>
                </div>
              </form>;
            }
          } />
        </div>
      </div>
    </div>
  );
};

export default Popup;
