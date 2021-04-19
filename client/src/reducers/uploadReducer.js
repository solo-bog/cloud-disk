import {filesAPI} from '../api/userAgent';
import {addFile} from './fileReducer';

const TOGGLE_UPLOAD_POPUP = 'TOGGLE_UPLOAD_POPUP';
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
const DELETE_UPLOAD_FILE = 'DELETE_UPLOAD_FILE';
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE';
const CLEAR_UPLOAD_FILES = 'CLEAR_UPLOAD_FILES';

const defaultState = {
  files: [],
  showUploadPopup: false,
};

export const uploadReducer = (state=defaultState, action) => {
  switch (action.type) {
    case TOGGLE_UPLOAD_POPUP:
      return {
        ...state,
        showUploadPopup: action.visible,
      };
    case ADD_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, action.file],
      };
    case DELETE_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files.filter((file)=>file.id!==action.fileId)],
      };
    case CHANGE_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files.map((file)=> file.id===action.fileId ?
          {...file, progress: action.progress} : {...file})],
      };
    case CLEAR_UPLOAD_FILES:
      return {
        ...state,
        files: [],
      };
    default: return state;
  }
};

export const toggleUploadPopup = (visible) => ({type: TOGGLE_UPLOAD_POPUP, visible});
const addUploadFile = (file) => ({type: ADD_UPLOAD_FILE, file});
export const deleteUploadFile = (fileId) => ({type: DELETE_UPLOAD_FILE, fileId});
const changeUploadFile = (fileId, progress) => ({type: CHANGE_UPLOAD_FILE, fileId, progress});
export const clearUploadFiles = () => ({type: CLEAR_UPLOAD_FILES});

export const uploadFile = (file, dirId) => {
  return async (dispatch, getState) =>{
    try {
      const uploadFileId = getState().upload.files.length;
      const uploadFile = {name: file.name, progress: 0, id: uploadFileId};
      dispatch(toggleUploadPopup(true));
      dispatch(addUploadFile(uploadFile));
      const updateProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        dispatch(changeUploadFile(uploadFile.id, percentCompleted));
      };
      const response = await filesAPI.uploadFile(file, dirId, updateProgress);
      dispatch(addFile(response));
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };
};
