export const byteConverter = (bytes) => {
  if (bytes >= 1073741824) {
    return (bytes/1073741824).toFixed(1)+' Gb';
  } else if (bytes >= 1048576) {
    return (bytes/1048576).toFixed(1)+' Mb';
  } else if (bytes >= 1024) {
    return (bytes/1024).toFixed(1)+' Kb';
  }
  return bytes+' B';
};
