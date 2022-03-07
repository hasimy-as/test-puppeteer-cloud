const data = (res, data, message, code) => {
  return res.send(code, { error: false, data, message, code });
};

const error = (res, message, code) => {
  return res.send(code, { error: true, data: null, message, code });
};

module.exports = {
  data,
  error
};
