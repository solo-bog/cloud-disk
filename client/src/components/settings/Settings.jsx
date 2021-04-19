import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '../../config';
import userDefaultImage from '../../assets/icons/user.svg';
import './settings.scss';
import {deleteAvatar, uploadAvatar} from '../../reducers/userReducer';

const Settings = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userAvatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : userDefaultImage;
  const dispatch = useDispatch();
  const deleteAvatarHandler = () => {
    if (currentUser.avatar) {
      dispatch(deleteAvatar());
    }
  };
  const uploadAvatarHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };
  return (
    <div className='settings'>
      <div className='settings__user-photo'>
        <img src={userAvatar}/>
      </div>
      <div className='settings__buttons'>
        <button onClick={deleteAvatarHandler} className='settings__btn settings__delete-action'>Delete photo</button>
        <label className='settings__btn setting__upload-action' htmlFor='photoUpload'>Upload photo
          <input onChange={uploadAvatarHandler} id='photoUpload' type="file" accept="image/*"/>
        </label>
      </div>
    </div>
  );
};

export default Settings;
