import {filesAPI} from '../api/userAgent';
import {FORM_ERROR} from 'final-form';

const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const SET_FILES_VIEW = 'SET_FILES_VIEW';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const ADD_FILE = 'ADD_FILE';
const defaultState = {
  files: [],
  currentDir: null,
  prevCurrentDir: null,
  sortBy: 'name',
  viewType: 'list',
  isPopupDisplay: false,
};

export const fileReducer = (state=defaultState, action) => {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case SET_CURRENT_DIR:
      return {
        ...state,
        currentDir: action.payload,
      };
    case SET_FILES_VIEW:
      return {
        ...state,
        viewType: action.viewType,
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.file],
      };
    case SET_POPUP_DISPLAY:
      return {
        ...state,
        isPopupDisplay: action.display,
      };
    default: return state;
  }
};

const setFiles = (files) =>({type: SET_FILES, payload: files});
const addFile = (file) =>({type: ADD_FILE, file});
export const setPopupDisplay = (display) =>({type: SET_POPUP_DISPLAY, display});
export const setFilesView = (viewType) => ({type: SET_FILES_VIEW, viewType});
export const setCurrentDir = (dir) =>({type: SET_CURRENT_DIR, payload: dir});

export const loadFiles = (dirId) =>{
  return async (dispatch) =>{
    try {
      const response = await filesAPI.getFiles(dirId);
      dispatch(setFiles(response));
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
};

export const createDir = (dirName) => {
  return async (dispatch, getState) =>{
    try {
      const currentDir = getState().files.currentDir;
      const response = await filesAPI.createDir(currentDir, dirName);
      dispatch(addFile(response));
      dispatch(setPopupDisplay(false));
    } catch (e) {
      return {
        [FORM_ERROR]: e.response.data.message,
      };
    }
  };
};
