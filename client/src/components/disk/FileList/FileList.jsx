import React from 'react';
import File from './File/File';
import {useSelector} from 'react-redux';
import './fileList.scss';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const FileList = (props) => {
  const viewType = useSelector((state) => state.files.viewType);
  const files = useSelector((state) => state.files.files);
  return (
    <div {...props} className={'file-list'}>
      {viewType == 'list' &&
      <div className='file-list__header'>
        <div className='file-list__header_name'>Name</div>
        <div className='file-list__header_date'>Date</div>
        <div className='file-list__header_size'>Size</div>
      </div>
      }
      {files.length === 0 && <div className='file-list__message'>Empty directory</div>}
      <TransitionGroup className={viewType}>
        {files.map((item)=>
          <CSSTransition timeout={500} classNames='file' key={item._id}>
            <File viewType={viewType} file={item}/>
          </CSSTransition>)}
      </TransitionGroup>
    </div>
  );
};

export default FileList;
