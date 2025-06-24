import AppError from "../middleware/appError.js";
import Shelf from "../models/shelfModel.js";
import catchAsync from "../utils/catchAsync.js";
import { shelfValidator } from "../validator/shelfValidator.js";
import mongoose from "mongoose";

// Create shelf
export const createShelf = catchAsync(async (req, res, next) => {
  const validateReqBody = shelfValidator(req.body);

  if (validateReqBody) {
    return next(
      new AppError(validateReqBody.message, validateReqBody.statusCode)
    );
  }

  const shelfExist = await Shelf.findOne({ name: req.body.name });

  if (shelfExist) {
    return next(new AppError("Shelf already has this name", 403));
  }

  const newShelf = await Shelf.create(req.body);

  return res.status(201).json({
    status: "success",
    data: { newShelf },
  });
});

// Get all shelves
export const getAllShelves = catchAsync(async (req, res, next) => {
  const shelves = await Shelf.find().sort({ createdAt: -1 });

  if (!shelves || shelves.length <= 0) {
    return next(new AppError("No shelf found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: { shelves },
  });
});

// Get shelf
export const getShelf = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid shelf id", 404));
  }

  const shelf = await Shelf.findById(id);

  if (!shelf) {
    return next(new AppError("Shelf does not exist...", 400));
  }

  return res.status(200).json({
    status: "success",
    data: { shelf },
  });
});

// Update shelf
export const updateShelf = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid shelf id", 404));
  }

  const updatedShelf = await Shelf.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedShelf) {
    return next(new AppError("Shelf does not exist...", 404));
  }

  return res.status(200).json({
    status: "success",
    data: { updatedShelf },
  });
});

// Delete shelf
export const deleteShelf = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid shelf id", 404));
  }
  const deletedShelf = await Shelf.findByIdAndDelete(id);

  if (!deletedShelf) {
    return next(new AppError("Shelf does not exist...", 404));
  }

  return res.status(204).send();
});
