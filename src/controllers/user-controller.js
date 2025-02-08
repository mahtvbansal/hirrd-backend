const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const {
  createUserService,
  loginService,
  setRoleService,
  getDetailsService
} = require("../services");

const login = async (req, res) => {
  try {
    const response = await loginService(req.body);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  return re.test(email);
}

const signup = async (req, res) => {
  try {
    const { role, name, username, email, password } = req.body;

    // 1. Input Validation (example)
    if (!email || !isValidEmail(email) || !password || password.length < 8) {
      ErrorResponse.message = "Invalid email or password";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    const response = await createUserService(req.body);
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

const changeRole = async (req, res) => {
  try {
    const userId = req.user.userId;
    const response = await setRoleService(req.body.role, userId);
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};
const getDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const response = await getDetailsService(userId);
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

module.exports = {
  loginController: login,
  signupController: signup,
  changeRoleController: changeRole,
  getDetailsController: getDetails
};
