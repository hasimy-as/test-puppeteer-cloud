const CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};


const OPTIONS = {
  CORS: { preflightMaxAge: 5 },
  PARSER: { multiples: true, mapParams: true }
};

module.exports = {
  CODE,
  OPTIONS
};
