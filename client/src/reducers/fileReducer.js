import {filesAPI} from "../api/userAgent";

const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const defaultState = {
    files:[],
    currentDir:null,
    sortBy:'name',
    viewType:'list'
}

export default function fileReducer (state=defaultState,action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        default: return state

    }
}

const setFiles = (files) =>({type:SET_FILES,payload:files})
const setCurrentDir = (dir) =>({type:SET_CURRENT_DIR,payload:dir})

export const loadFiles = (dirId) =>{
    return async (dispatch) =>{
        try{
            const response = await filesAPI.getFiles(dirId)
            dispatch(setFiles(response))
        }catch (e) {
            console.log(e.response.data.message)
        }
    }
}