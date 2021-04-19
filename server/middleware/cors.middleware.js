/**
 * get access all origins
 * @param {object} req - request
 * @param {object} res - response
 * @param {function} next - next middleware
 */
function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
}

module.exports = cors;
