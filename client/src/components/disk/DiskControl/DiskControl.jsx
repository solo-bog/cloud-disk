import React from 'react';
import prevDirIcon from '../../../assets/icons/prev_dir.svg';
import sortIcon from '../../../assets/icons/sort_icon.svg';
import listView from '../../../assets/icons/list_view.svg';
import tableView from '../../../assets/icons/table_view.svg';
import './diskControl.scss';
import {useDispatch, useSelector} from 'react-redux';
import {dirPop, setCurrentDir, setFilesView, setPopupDisplay} from '../../../reducers/fileReducer';
import Popup from './Popup/Popup';
import {uploadFile} from '../../../reducers/uploadReducer';

const DiskControl = ({sort, setSort, currentDir}) => {
  const dispatch = useDispatch();
  const isPopupDisplay = useSelector((state) => state.files.isPopupDisplay);
  const prevDir = useSelector((state) => state.files.dirStack[state.files.dirStack.length-1]);
  const openPrevDirHandler = () => {
    if (currentDir) {
      dispatch(setCurrentDir(prevDir));
      dispatch(dirPop());
    }
  };
  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => {
      dispatch(uploadFile(file, currentDir));
    });
  };
  return (
    <div className="disk-control">
      <div>
        <div className="disk-control__btn">
          <img className='disk-control__icon' src={prevDirIcon} alt="" onClick={openPrevDirHandler}/>
        </div>
      </div>

      <div className='disk-control__sort'>
        <label htmlFor="sort"><img className='disk-control__icon' src={sortIcon} alt="sort"/></label>
        <select name="sort" value={sort} onChange={(e)=>setSort(e.target.value)} id="sort">
          <option value="name" defaultValue>Name</option>
          <option value="size">Size</option>
          <option value="date">Date</option>
          <option value="type">Type</option>
        </select>
      </div>


      <div className='disk-control__view'>
        <img className='disk-control__icon' onClick={() => dispatch(setFilesView('list'))} src={listView}/>
        <img className='disk-control__icon' onClick={() => dispatch(setFilesView('table'))} src={tableView}/>

      </div>

      <div className='disk-control__actions'>
        <div className='disk-control__btn' onClick={() => dispatch(setPopupDisplay(true))}>Create directory</div>
        <label htmlFor='files' className='disk-control__btn disk-control__upload-btn'>Add files<input onChange={(e)=>fileUploadHandler(e)} multiple type='file' id='files'/></label>
      </div>
      {isPopupDisplay && <Popup/>}

    </div>
  );
};

export default DiskControl;
