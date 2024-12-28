// Standardized response function

import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getUserByIdService,
  updateUserService
} from "../models/userModel.js";

const handeResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email);
    handeResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUserService();
    handeResponse(res, 200, "UserS FETCHED successfully", users);
  } catch (error) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return handeResponse(res, 404, "User not found");
    handeResponse(res, 200, "User FETCHED successfully", user);
  } catch (error) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(req.params.id, name, email);
    if (!user) return handeResponse(res, 404, "User not found");
    handeResponse(res, 200, "User UPDATED successfully", updatedUser);
  } catch (error) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUSer = await deleteUserService(req.params.id);
    if (!user) return handeResponse(res, 404, "User not found");
    handeResponse(res, 200, "User DELETED successfully", deletedUSer);
  } catch (error) {
    next(err);
  }
};
