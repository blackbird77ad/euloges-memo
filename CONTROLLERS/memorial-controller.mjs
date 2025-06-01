import { MemorialModel } from "../MODELS/memorial-model.mjs";
import { postMemorialValidator, patchMemorialValidator } from "../VALIDATORS/memorial-validator.mjs";
import { UserModel } from "../MODELS/user-model.mjs";

export const createMemo = async (req, res, next) => {
  try {
    // 1. Validate input data
    const { error, value } = postMemorialValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "failed",
        message: "Request validation failed",
        details: error.details.map(d => d.message)
      });
    }

    // 2. Get authenticated user ID (auth middleware set req.user)
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized. User not logged in." });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3. Create the memorial entry
    const memorial = new MemorialModel({
      ...value,
      createdBy: user._id //field for traceability
    });

    await memorial.save();

    // 4.Associate the memorial with the user 
    user.memorials = user.memorials || [];
    user.memorials.push(memorial._id);
    await user.save();

    // 5.Respond with success
    res.status(201).json({
      status: "success",
      message: "Memorial Created Successfully",
      memorial
    });
  } catch (error) {
    next(error);
  }
};

// GET all memorials (public)
export const getMemorials = async (req, res, next) => {
    try {
      const memorials = await MemorialModel.find().sort({ createdAt: -1 });
      res.status(200).json({
        status: "success",
        count: memorials.length,
        data: memorials
      });
    } catch (error) {
      next(error);
    }
  };
  
  // GET a single memorial by ID (public)
export const getMemorialById = async (req, res, next) => {
    try {
      const memorial = await MemorialModel.findById(req.params.id);
      if (!memorial) {
        return res.status(404).json({ message: "Memorial not found" });
      }
      res.status(200).json({ status: "success", data: memorial });
    } catch (error) {
      next(error);
    }
  };


  // UPDATE memorial (private - only creator or admin)
export const updateMemorial = async (req, res, next) => {
    try {
      // Validate request body
      const { error, value } = patchMemorialValidator.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "Validation error: mismatch fields",
          details: error.details.map(d => d.message)
        });
      }
  
      const memorial = await MemorialModel.findById(req.params.id);
      if (!memorial) return res.status(404).json({ message: "Memorial not found" });
  
      // check if the user is owner
      if (String(memorial.createdBy) !== req.user.id) {
        return res.status(403).json({ message: "You are not allowed to update this memorial" });
      }
  
      const updatedMemorial = await MemorialModel.findByIdAndUpdate(req.params.id, value, { new: true });
      res.status(200).json({ status: "success", data: updatedMemorial });
    } catch (error) {
      next(error);
    }
  };

  // DELETE memorial (private - only creator or admin)
export const deleteMemorial = async (req, res, next) => {
    try {
      const memorial = await MemorialModel.findById(req.params.id);
      if (!memorial) return res.status(404).json({ message: "Memorial not found" });
  
      // check if the user is owner
      if (String(memorial.createdBy) !== req.user.id) {
        return res.status(403).json({ message: "You are not allowed to delete this memorial" });
      }
  
      await MemorialModel.findByIdAndDelete(req.params.id);
  
      //  remove from user.memorials
      await UserModel.updateOne(
        { _id: req.user.id },
        { $pull: { memorials: req.params.id } }
      );
  
      res.status(200).json({ message: "Memorial deleted successfully" });
    } catch (error) {
      next(error);
    }
  };