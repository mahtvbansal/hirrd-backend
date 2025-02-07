// middleware/authMiddleware.js
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function authenticate(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ErrorResponse.error = new AppError(
      "Unauthorized: No token provided",
      StatusCodes.UNAUTHORIZED
    );
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
  }

  const token = authHeader.substring(7); // Extract the token (remove "Bearer ")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Store the decoded payload in req.user for later use -> { userId: id }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      ErrorResponse.error = new AppError(
        "Unauthorized: Token expired",
        StatusCodes.UNAUTHORIZED
      );
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    ErrorResponse.error = new AppError(
      "Unauthorized: Invalid token",
      StatusCodes.UNAUTHORIZED
    );
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
  }
}

module.exports = authenticate;
