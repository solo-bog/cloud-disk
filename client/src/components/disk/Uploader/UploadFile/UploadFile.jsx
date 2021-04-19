import React from 'react';
import './uploadFile.scss';
const UploadFile = ({fileName, progress, deleteFile}) => {
  return (
    <div className='upload-file'>
      <span className='upload-file__name'>{fileName}</span>
      <progress value={progress} max="100"></progress>
      <span onClick={deleteFile} className='upload-file__close'>&#10006;</span>
    </div>
  );
};

export default UploadFile;
