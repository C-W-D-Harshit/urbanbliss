// Create Token and saving in cookie

const sendToken = (vendor, statusCode, res) => {
  const token = vendor.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    vendor,
    token,
  });
};

module.exports = sendToken;