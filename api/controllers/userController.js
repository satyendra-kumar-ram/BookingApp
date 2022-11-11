import User from '../models/User.js';

export const updateUser = async (req, res,next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted");
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res,next) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req, res,next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}