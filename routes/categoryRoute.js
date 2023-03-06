import express from 'express';
import { categoriesController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from './../controllers/categoryController.js';
const router = express.Router()

//*************** ROUTES *******************
//----------------- CREATE CATEGORY ROUTE ------------------

router.post('/create-category', createCategoryController)

//----------------- UPDATE CATEGORY ROUTE ------------------
router.put('/update-category/:id', updateCategoryController)

//----------------- GET ALL CATEGORIES ROUTE ------------------
router.get('/categories', categoriesController)

//----------------- GET SINGLE CATEGORY ROUTE ------------------
router.get('/single-category/:name', singleCategoryController);

//----------------- DELETE CATEGORY ROUTE ------------------
router.delete('/delete-category/:id', deleteCategoryController)
export default router