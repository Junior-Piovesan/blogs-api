const statusHTPP = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  BOT_FOUND: 404,
};

const mapStatusHTTP = (status) => statusHTPP[status];

module.exports = mapStatusHTTP;