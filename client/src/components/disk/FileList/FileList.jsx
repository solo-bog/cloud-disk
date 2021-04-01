import React from 'react';
import File from './File/File';
import {useSelector} from 'react-redux';
import './fileList.scss';

const FileList = () => {
  const viewType = useSelector((state) => state.files.viewType);
  const files = useSelector((state) => state.files.files)
      .map((item)=><File viewType={viewType} key={item._id} file={item}/>);
  return (
    <div className={`file-list ${viewType}`}>
      {viewType == 'list' &&
      <div className='file-list__header'>
        <div className='file-list__header_name'>Name</div>
        <div className='file-list__header_type'>Type</div>
        <div className='file-list__header_date'>Date</div>
        <div className='file-list__header_size'>Size</div>
      </div>
      }
      {files}
    </div>
  );
};

export default FileList;
