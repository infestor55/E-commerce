import categoryModel from "../models/categoryModel.js";


//----------------- CREATE CATEGORY CONTROLLER ------------------
export const createCategoryController = async(req,res)=>{
    try{
        const {name,description} = req.body
        if(!name) {
            return res.status(401).send({message: 'Name is Required'})
        }
        if(!description) {
            return res.status(401).send({message: 'Description is Required'})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'category already exists'
            })
        }
        const category = await new categoryModel({name,description}).save();
        res.status(201).send({
            success: true,
            message: 'new category Created',
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category creation'
        })
    }
};


//----------------- UPDATE CATEGORY CONTROLLER ------------------
export const updateCategoryController = async(req,res)=>{
    try{
        const {name, description} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, description}, {new: true})
        res.status(200).send({
            success: true,
            message: "Category Updated successfully",
            category
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error updating category'
        })
    }
}


//----------------- GET ALL CATEGORIES CONTROLLER ------------------
export const categoriesController = async(req,res)=>{
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All categories List has been provided',
            category,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Failed to get all categories'
        })
    }
}
//----------------- GET A SINGLE CATEGORY CONTROLLER ------------------
export const singleCategoryController = async(req,res)=>{
    try{

        const category = await categoryModel.findOne({name: req.params.name})
        res.status(200).send({
            success: true,
            message: 'category provided with success',
            category
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to provide the category',
            error
        });
    }
};


//----------------- DELETE CATEGORY CONTROLLER ------------------
export const deleteCategoryController = async(req,res)=>{
    try{
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to delete category',
            error
        })
    }
}