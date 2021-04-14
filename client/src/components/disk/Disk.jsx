import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadFiles} from '../../reducers/fileReducer';
import './disk.scss';
import DiskControl from './DiskControl/DiskControl';
import FileList from './FileList/FileList';
import Preloader from '../common/Preloader/Preloader';
import Uploader from './Uploader/Uploader';
import {uploadFile} from '../../reducers/uploadReducer';

const Disk = () => {
  const currentDir = useSelector((state) => state.files.currentDir);
  const currenrDirPath = useSelector((state) => state.files.dirPath);
  const dispatch = useDispatch();
  const [isFetching, setFetching] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('name');
  useEffect(()=>{
    setFetching(true);
    dispatch(loadFiles(currentDir, sort)).then(()=>setFetching(false));
  }, [currentDir, sort]);
  const dragEnterHandler = (event) => {
    event.preventDefault();
    setDragEnter(true);
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
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
        <span onClick={()=>setVisibleUploadWindow(true)}>{currenrDirPath.join('/')}</span>
      </div>
      <DiskControl currentDir={currentDir} sort={sort} setSort={setSort}/>
      {isFetching ? <Preloader/> :
        !dragEnter ? <FileList onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}/> :
      <div className='disk__drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>Перетягніть сюди файли</div> }
      <Uploader/>
    </div>
  );
};

export default Disk;
