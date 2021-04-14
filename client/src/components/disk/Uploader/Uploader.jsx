import React from 'react';
import './uploader.scss';
import UploadFile from './UploadFile/UploadFile';
import {useDispatch, useSelector} from 'react-redux';
import {clearUploadFiles, deleteUploadFile, toggleUploadPopup} from '../../../reducers/uploadReducer';

const Uploader = () => {
  const files = useSelector((state)=>state.upload.files);
  const showUploader = useSelector((state) => state.upload.showUploadPopup);
  const dispatch = useDispatch();
  const closeUploaderHandler = () => {
    dispatch(toggleUploadPopup(false));
    dispatch(clearUploadFiles());
  };
  const closeUploadFileHandler = (fileId) => {
    dispatch(deleteUploadFile(fileId));
  };
  return (showUploader &&
    <div className='uploader'>
      <span onClick={closeUploaderHandler} className='uploader__close-btn'>&#10006;</span>
      <div className='uploader__header'>Upload file</div>
      <div className='uploader__file-list'>
        {files.map((file)=>
          <UploadFile
            key={file.id}
            fileName={file.name}
            progress={file.progress}
            deleteFile={()=>closeUploadFileHandler(file.id)}/>)
        }
      </div>
    </div>
  );
};

export default Uploader;
