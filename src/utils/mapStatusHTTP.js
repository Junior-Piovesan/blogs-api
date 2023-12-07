const statusHTPP = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const mapStatusHTTP = (status) => statusHTPP[status];

module.exports = mapStatusHTTP;