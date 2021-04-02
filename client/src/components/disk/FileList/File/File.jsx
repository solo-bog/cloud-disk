import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/img/folder_icon.svg';
import fileLogo from '../../../../assets/img/file_icon.svg';
import {useDispatch} from 'react-redux';
import {setCurrentDir} from '../../../../reducers/fileReducer';
const File = ({file, viewType}) => {
  const dispatch = useDispatch();
  const setCurrentDirHandler = (newDir) => {
    dispatch(setCurrentDir(newDir));
  };
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
      <div className="file__name" title={file.name} onClick={file.type === 'dir'? () => setCurrentDirHandler(file._id):null}>{file.name}</div>
      {viewType == 'list' &&
        <React.Fragment>
          <div className="file__type">{file.type}</div>
          <div className="file__date">{file.date.slice(0, 10)}</div>
          <div className="file__size">{file.size}</div>
        </React.Fragment>
      }
    </div>
  );
};

export default File;
