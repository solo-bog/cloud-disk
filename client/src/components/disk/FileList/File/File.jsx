import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/icons/folder_icon.svg';
import fileLogo from '../../../../assets/icons/file_icon.svg';
import {useDispatch} from 'react-redux';
import {dirPush, setCurrentDir} from '../../../../reducers/fileReducer';
import {byteConverter} from '../../../../utills/utills';
import downloadIcon from '../../../../assets/icons/down-arrow.svg';
import deleteIcon from '../../../../assets/icons/Vector 9.svg';
import {downloadFile} from '../../../../api/userAgent';
const File = ({file, viewType}) => {
  const dispatch = useDispatch();
  const setCurrentDirHandler = (file) => {
    if (file.type === 'dir') {
      dispatch(setCurrentDir(file._id));
      dispatch(dirPush(file.parent, file.name));
    }
  };
  const downloadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" onClick={() => setCurrentDirHandler(file)}/>
      <div className="file__name" title={file.name} onClick={() => setCurrentDirHandler(file)}>{file.name}</div>
      {viewType == 'list' &&
        <React.Fragment>
          <div className="file__download">
            {file.type!=='dir' && <button onClick={(e)=>downloadClickHandler(e)}>
              <img className='disk-control__icon' src={downloadIcon}/>
            </button>}
          </div>
          <div className="file__delete">
            <button>
              <img className='disk-control__icon' src={deleteIcon}/></button>
          </div>
          <div className="file__date">{file.date.slice(0, 10)}</div>
          <div className="file__size">{byteConverter(file.size)}</div>
        </React.Fragment>
      }
    </div>
  );
};

export default File;
