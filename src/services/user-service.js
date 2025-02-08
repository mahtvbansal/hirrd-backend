const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse } = require("../utils/common");

const userRepository = new UserRepository();

const login = async (data) => {
  try {
    const { email, password } = data;
    const user = await userRepository.findOne({
      where: { email: email },
    });
    
    if (!user) {
      throw new AppError("Invalid email", StatusCodes.BAD_REQUEST);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });

    const response = {
        ...user.dataValues,
      token,
    }
    delete response.password

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signup = async (data) => {
  try {
    const { email, password, username, name } = data;
    // Email Existence Check
    const existingEmail = await userRepository.findOne({
      where: { email: email },
    });
    if (existingEmail) {
      throw new AppError("Email already exists", StatusCodes.BAD_REQUEST);
    }
    // Username Existence Check
    const existingUsername = await userRepository.findOne({
      where: { username: username },
    });
    if (existingUsername) {
      throw new AppError("Username already exists", StatusCodes.BAD_REQUEST);
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // User Creation
    const newUser = await userRepository.create({
      email,
      password: hashedPassword,
      username,
      name,
    });

    // JWT Generation
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });

    // Send Response
    const response = {
      token,
      ...newUser.dataValues,
    };
    delete response.password;
    return response; // 201 Created
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const setRole = async (role, id) => {
    try {
        const response = await userRepository.update({ role }, {id})
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getDetails = async (id) => {
    try {
        const response = await userRepository.get(id, {
          attributes: {exclude : ['password']}
        })
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
  createUserService: signup,
  loginService: login,
  setRoleService : setRole,
  getDetailsService : getDetails
};
