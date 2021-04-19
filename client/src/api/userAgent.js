import * as axios from 'axios';
import {API_URL} from '../config';


const instance = axios.create({
  baseURL: `${API_URL}api/`,
});

export const usersAPI = {
  registration(email, password) {
    return instance.post(`auth/registration`, {email, password})
        .then((response) => response.data);
  },
  login(email, password) {
    return instance.post(`auth/login`, {email, password})
        .then((response) => response.data);
  },
  auth() {
    return instance.get(`auth/auth`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        .then((response) => response.data);
  },
  uploadAvatar(file) {
    const formData = new FormData();
    formData.append('file', file);
    return instance.post(`files/avatar`,
        formData,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        .then((response) => response.data);
  },
  deleteAvatar() {
    return instance.delete(`files/avatar`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        .then((response) => response.data);
  },
};

export const filesAPI = {
  getFiles(dir, sort) {
    let url = `/files`;
    if (dir) {
      url = `files?parent=${dir}`;
    }
    if (sort) {
      url = `files?sort=${sort}`;
    }
    if (dir && sort) {
      url = `files?parent=${dir}&sort=${sort}`;
    }
    return instance.get(url, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    })
        .then((response) => response.data);
  },
  createDir(parentDirId, name) {
    return instance.post('files', {
      name,
      parent: parentDirId,
      type: 'dir',
    }, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    }).then((response) => response.data);
  },
  uploadFile(file, parent, onUploadProgressFunc) {
    const formData = new FormData();
    formData.append('file', file);
    if (parent) {
      formData.append('parent', parent);
    }
    return instance.post('files/upload', formData, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      onUploadProgress: onUploadProgressFunc,
    }).then((response) => response.data);
  },
  deleteFile(fileId) {
    return instance.delete(`files?id=${fileId}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        }).then((response) => response.data);
  },
  searchFiles(name) {
    return instance.get(`files/search?search=${name}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        }).then((response) => response.data);
  },

};

export const downloadFile = async (file) => {
  try {
    const response = await instance.get(`files/download?id=${file._id}`, {
      responseType: 'blob',
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    });
    const blob = response.data;
    const downloadLink = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {
    console.log(e);
  }
};
