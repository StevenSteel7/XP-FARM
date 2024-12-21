import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category              // All these middel ware run befrre createrCategory
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//update category            //from db
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

//getALL category
router.get("/get-category", categoryControlller);

//single category             //from db
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);

export default router;
