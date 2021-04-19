/**
 * @param {string} filePath - path to files
 * @param {string} staticPath - path to static files
 * @return {function} new function
 */
function filePath(filePath, staticPath) {
  return function(req, res, next) {
    req.filePath = filePath;
    req.staticPath = staticPath;
    next();
  };
}

module.exports = filePath;
