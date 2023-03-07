import  express  from "express";
import { createProductController, deleteProductController, getPhotoController, getProductsController, getSingleProduct, updateProductController } from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";
const router = express.Router()

router.post("/create-product",ExpressFormidable(), createProductController)
//get all products route
router.get('/get-products', getProductsController);
//get a single product
router.get('/single-product/:id', getSingleProduct);

//route get photo
router.get('/get-photo/:pid', getPhotoController)

//delete product route
router.delete('/delete-product/:id', deleteProductController)

//update product route
router.put('/update-product/:pid', updateProductController)
export default router