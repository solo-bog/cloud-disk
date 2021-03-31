import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadFiles} from '../../reducers/fileReducer';
import './disk.scss';
import DiskControl from './DiskControl/DiskControl';
import FileList from './FileList/FileList';

const Disk = () => {
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadFiles(currentDir));
  }, [currentDir]);
  return (
    <div className='disk'>
      <div className="disk__header">
        <h1>Videos</h1>
      </div>
      <DiskControl/>
      <FileList/>

    </div>
  );
};

export default Disk;
