import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";
export const createProductController = async(req,res)=>{
    try{
        const {name, slug, description, price, category} = req.fields
        const{photo} = req.files

        //validation 
        switch(true){
            case !name: 
            return res.status(500).send({error: 'Name is required'})
            
            
            case !description: 
            return res.status(500).send({error: 'description is required'})
            case !price: 
            return res.status(500).send({error: 'price is required'})
            case !category: 
            return res.status(500).send({error: 'category is required'})
            case photo && photo.size > 1000000: 
            return res.status(500).send({error: 'photo is required andshould be less than 1mb'})
        }
        const products = new productModel({...req.fields,slug:slugify(name)});
        if({photo}){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        })
    }
};

// get all products controller
export const getProductsController = async(req,res)=>{
    try{
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All products are provided',
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Failed to get poducts',
            error
        })
    }
};

//get single product controller
export const getSingleProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const product = await productModel.findOne({id: req.params, id}).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: 'Product provided successfully',
            product
            
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to get the product',
            error
        })
    }
};
//get photo controller
export const getPhotoController = async(req,res)=>{
    try{
        const product =await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to provide photo',
            error
        })
    }
};
//delete product controller 
export const deleteProductController = async(req,res)=>{
    try{
        const {id} = req.params
        await productModel.findByIdAndDelete(req.params.id).select('-photo')
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to delete a product',
            error
        })
    }
}

//update product controller

export const updateProductController = async(req,res)=>{
    try{
        const {name, slug, description, price, category} = req.fields
        const{photo} = req.files
        console.log(name,slug,description,price,category)

        //validation 
        switch(true){
            case !name: 
            return res.status(500).send({error: 'Name is required'})
            case !description: 
            return res.status(500).send({error: 'description is required'})
            case !price: 
            return res.status(500).send({error: 'price is required'})
            case !category: 
            return res.status(500).send({error: 'category is required'})
            case photo && photo.size > 1000000: 
            return res.status(500).send({error: 'photo is required andshould be less than 1mb'})
        }
       const{id} = req.params
        const products = await productModel.findByIdAndUpdate(req.params.id,{...req.fields.id,slug:slugify(name)}, {new: true});
        if({photo}){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            products,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating product',
            error
        });
    }
}