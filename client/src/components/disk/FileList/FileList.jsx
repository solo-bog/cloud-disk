import React from 'react';
import File from "./File/File";
import {useSelector} from "react-redux";

const FileList = () => {
    const viewType = 'table'
    const files = useSelector(state => state.files.files).map((item)=><File key={item._id} file={item}/>)

    return (
        <div className={viewType==='table'?'file-list-table':'file-list'}>
            {files}
        </div>
    );
};

export default FileList;