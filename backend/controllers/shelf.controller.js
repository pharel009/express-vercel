import AppError from "../middleware/appError.js";
import Shelf from "../models/shelfModel.js";
import catchAsync from "../utils/catchAsync.js";
import { shelfValidator } from "../validator/shelfValidator.js";

// Create shelf
export const createShelf = catchAsync(async (req, res, next) => {
    const validateReqBody = shelfValidator(req.body);

    if (validateReqBody) {
        return next(new AppError(validateReqBody.message, validateReqBody.statusCode));
    }

    const shelfExist = await Shelf.findOne({ name: req.body.name });

    if (shelfExist) {
        return next(new AppError('Shelf already has this name', 403));
    }

    const newShelf = await Shelf.create(req.body);

    return res.status(201).json({
        status: 'success',
        data: { newShelf }
    })
});

// Get all shelves
export const getAllShelves = catchAsync(async (req, res, next) => {
    const shelves = await Shelf.find();

    if (!shelves || shelves.length <= 0) {
        return next(new AppError('No shelf found', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: { shelves }
    });
});


// Get shelf
export const  getShelf = catchAsync();


// Update shelf
export const updateShelf = catchAsync();


// Delete shelf
export const deletesShelf = catchAsync();

