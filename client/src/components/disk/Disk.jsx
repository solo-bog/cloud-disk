import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadFiles, uploadFile} from '../../reducers/fileReducer';
import './disk.scss';
import DiskControl from './DiskControl/DiskControl';
import FileList from './FileList/FileList';
import Preloader from '../common/Preloader/Preloader';

const Disk = () => {
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  const [isFetching, setFetching] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);
  useEffect(()=>{
    setFetching(true);
    dispatch(loadFiles(currentDir)).then(()=>setFetching(false));
  }, [currentDir]);
  const dragEnterHandler = (event) => {
    event.preventDefault();
    setDragEnter(true);
    console.log('1');
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
    console.log('2');
  };
  const dropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.dataTransfer.files];
    console.log(files);
    files.forEach((file) => {
      dispatch(uploadFile(file, currentDir));
    });
    setDragEnter(false);
  };
  return (
    <div className='disk'>
      <div className="disk__header">
        <h1>Videos</h1>
      </div>
      <DiskControl/>
      {isFetching ? <Preloader/> :
        !dragEnter ? <FileList onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}/> :
      <div className='disk__drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>Перетягніть сюди файли</div> }
    </div>
  );
};

export default Disk;
