import React from 'react';
import prevDirIcon from '../../../assets/img/prev_dir.svg';
import sortIcon from '../../../assets/img/sort_icon.svg';
import listView from '../../../assets/img/list_view.svg';
import tableView from '../../../assets/img/table_view.svg';
import './diskControl.scss';
import {useDispatch} from 'react-redux';
import {setFilesView} from '../../../reducers/fileReducer';

const DiskControl = () => {
  const dispatch = useDispatch();
  return (
    <div className="disk-control">
      <div>
        <div className="disk-control__btn">
          <img className='disk-control__icon' src={prevDirIcon} alt=""/>
        </div>
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
        <div className='disk-control__btn'>Create directory</div>
      </div>


    </div>
  );
};

export default DiskControl;
