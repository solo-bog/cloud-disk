import * as axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
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
};

export const filesAPI = {
  getFiles(dir) {
    return instance.get(`files${dir?'?parent='+dir :''}`, {
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
  uploadFile(file, parent) {
    const formData = new FormData();
    formData.append('file', file);
    if (parent) {
      formData.append('parent', parent);
    }
    return instance.post('files/upload', formData, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        console.log('total', totalLength);
        if (totalLength) {
          const progress = Math.round((progressEvent.loaded * 100) / totalLength);
          console.log(progress);
        }
      },
    }).then((response) => response.data);
  },
};

export const downloadFile = async (file) => {
  try {
    const response = await instance.get(`files/download?id=${file._id}`, {
      responseType: 'blob',
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    });
    console.log(response);
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
