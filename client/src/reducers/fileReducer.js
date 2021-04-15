import {filesAPI} from '../api/userAgent';
import {FORM_ERROR} from 'final-form';

const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const SET_FILES_VIEW = 'SET_FILES_VIEW';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const ADD_FILE = 'ADD_FILE';
const DIR_STACK_PUSH = 'DIR_STACK_PUSH';
const DIR_STACK_POP = 'DIR_STACK_POP';
const DELETE_FILE = 'DELETE_FILE';

const defaultState = {
  files: [],
  currentDir: null,
  dirStack: [],
  dirPath: ['root'],
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
    case DIR_STACK_PUSH:
      return {
        ...state,
        dirStack: [...state.dirStack, action.dir],
        dirPath: [...state.dirPath, action.dirName],
      };
    case DIR_STACK_POP:
      return {
        ...state,
        dirStack: state.dirStack.slice(0, state.dirStack.length-1),
        dirPath: state.dirPath.slice(0, state.dirPath.length-1),
      };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((item)=>item._id!==action.fileId)],
      };
    default: return state;
  }
};

const setFiles = (files) =>({type: SET_FILES, payload: files});
export const addFile = (file) =>({type: ADD_FILE, file});
export const setPopupDisplay = (display) =>({type: SET_POPUP_DISPLAY, display});
export const setFilesView = (viewType) => ({type: SET_FILES_VIEW, viewType});
export const setCurrentDir = (dir) =>({type: SET_CURRENT_DIR, payload: dir});
export const dirPush = (dir, dirName) =>({type: DIR_STACK_PUSH, dir, dirName});
export const dirPop = () =>({type: DIR_STACK_POP});
const deleteFileAction = (fileId) =>({type: DELETE_FILE, fileId});

export const loadFiles = (dirId, sort) =>{
  return async (dispatch) =>{
    try {
      const response = await filesAPI.getFiles(dirId, sort);
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


export const deleteFile = (fileId) => {
  return async (dispatch) =>{
    try {
      await filesAPI.deleteFile(fileId);
      dispatch(deleteFileAction(fileId));
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };
};

export const searchFiles = (name) => {
  return async (dispatch) =>{
    try {
      const response = await filesAPI.searchFiles(name);
      dispatch(setFiles(response));
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };
};
