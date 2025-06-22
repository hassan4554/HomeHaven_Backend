const applyHeaders = (res, headers = {}) => {
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};

export const successResponse = {
  sendData: (res, { status = 200, message = "success", data = null }) => {
    applyHeaders(res);
    return res.status(status).json({
      error: null,
      message,
      data,
    });
  },
  sendCookieAndData: (
    res,
    {
      status = 200,
      message = "success",
      data = null,
      cookieName = null,
      token = null,
      options = {},
    }
  ) => {
    applyHeaders(res);
    return res.cookie(cookieName, token, options).status(status).json({
      error: null,
      message,
      data,
    });
  },
};

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
