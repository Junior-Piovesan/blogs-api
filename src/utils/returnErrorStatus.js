const returnErrorStatus = (statusCode, errorMessage) => (
  { status: statusCode, data: { message: errorMessage } }
);

module.exports = returnErrorStatus;