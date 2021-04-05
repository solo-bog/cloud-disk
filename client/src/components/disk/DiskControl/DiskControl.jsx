import React from 'react';
import prevDirIcon from '../../../assets/img/prev_dir.svg';
import sortIcon from '../../../assets/img/sort_icon.svg';
import listView from '../../../assets/img/list_view.svg';
import tableView from '../../../assets/img/table_view.svg';
import './diskControl.scss';
import {useDispatch, useSelector} from 'react-redux';
import {dirPop, setCurrentDir, setFilesView, setPopupDisplay} from '../../../reducers/fileReducer';
import Popup from './Popup/Popup';

const DiskControl = () => {
  const dispatch = useDispatch();
  const isPopupDisplay = useSelector((state) => state.files.isPopupDisplay);
  const currenrDirPath = useSelector((state) => state.files.dirPath);
  const dirStack = useSelector((state) => state.files.dirStack);
  const openPrevDirHandler = () => {
    dispatch(setCurrentDir(dirStack[dirStack.length-1]));
    dispatch(dirPop());
  };
  return (
    <div className="disk-control">
      <div>
        <div className="disk-control__btn">
          <img className='disk-control__icon' src={prevDirIcon} alt="" onClick={dirStack.length ? openPrevDirHandler: null}/>
        </div>
        <span>{currenrDirPath.join('/')}</span>
      </div>

      <div className='disk-control__sort'>
        <label htmlFor="sort"><img className='disk-control__icon' src={sortIcon} alt="sort"/></label>
        <select name="sort" id="sort">
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

      <div>
        <div className='disk-control__btn' onClick={() => dispatch(setPopupDisplay(true))}>Create directory</div>
      </div>
      {isPopupDisplay && <Popup/>}

    </div>
  );
};

export default DiskControl;
