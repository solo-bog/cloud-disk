import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/img/folder_icon.svg';
import fileLogo from '../../../../assets/img/file_icon.svg';
import {useDispatch} from 'react-redux';
import {dirPush, setCurrentDir} from '../../../../reducers/fileReducer';
import {byteConverter} from '../../../../utills/utills';
const File = ({file, viewType}) => {
  const dispatch = useDispatch();
  const setCurrentDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(setCurrentDir(file._id));
      dispatch(dirPush(file.parent, file.name));
    }
  };
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" onClick={() => setCurrentDirHandler(file)}/>
      <div className="file__name" title={file.name} onClick={() => setCurrentDirHandler(file)}>{file.name}</div>
      {viewType == 'list' &&
        <React.Fragment>
          <div className="file__type">{file.type}</div>
          <div className="file__date">{file.date.slice(0, 10)}</div>
          <div className="file__size">{byteConverter(file.size)}</div>
        </React.Fragment>
      }
    </div>
  );
};

export default File;
