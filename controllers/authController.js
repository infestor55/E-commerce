import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../helpers/authHelper.js';
import JWT  from 'jsonwebtoken';
export const registerController = async(req,res)=>{
    try{
        const {name,email,password,phone,adress} = req.body

        
//----------------- VALIDATION ------------------
        if(!name){
            return res.json({error: 'Name is required'});
        }
        if(!email){
            return res.json({error: 'Email is required'});
        }
        if(!password){
            return res.json({error: 'Password is required'});
        }
        if(!phone){
            return res.json({error: 'Phone is required'});
        }
        if(!adress){
            return res.json({error: 'Adress is required'});
        };


//----------------- CHECK USER ------------------
        const existingUser = await userModel.findOne({email})


//----------------- CHECK AN EXISTING USER ------------------
        if(existingUser){
            return res.status(200).json({
                success: true,
                message: 'User already existing please login'
            });
        }


//----------------- REGISTER A USER ------------------
        const hashedPassword = await hashPassword(password)


//----------------- SAVE USER ------------------
        const user = await new userModel({name,email,phone,adress,password: hashedPassword}).save()

        res.status(201).json({
            success: true,
           data: user
            
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in Registration",
            error
        })
    }
};


//----------------- POST LOGIN ------------------
export const loginController = async (req,res)=>{
    try{
        const {email, password} = req.body


//----------------- VALIDATION ------------------ 
        if(!email || !password){
           return res.status(404).send({
            success: false,
            message: 'INVALID EMAIL OR PASSWORD'
           })
        }


//----------------- CHECK USER ------------------
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User is not registred'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }


//----------------- TOKEN ------------------
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {
            expiresIn: '7d',

        });
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                adress: user.adress,

            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};


//----------------- TEST CONTROLLER ------------------
export const testController = (req,res)=>{
    res.send('protected Route')
};


//----------------- UPDATE USER CONTROLLER ------------------
export const updateUserController = async(req,res)=>{
    try{
        const {name, eemail, password, phone, adress} = req.body
        const {id} = req.params
        const user = await userModel.findByIdAndUpdate(id, {name, eemail, password, phone, adress}, {new: true})
        res.status(200).send({
            success: true,
            message: 'User Updated successfully',
            user

        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating user',
            error
        });
    }
};


//----------------- GET ALL USERS CONTROLLER ------------------
export const getallusers = async(req,res)=>{
    try{
        const user = await userModel.find({});
        res.status(200).send({
            success: true,
            message: 'User list provided successfully',
            user,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to get all users',
            error
        });
    }
};


//----------------- GET A SINGLE USER CONTROLLER ------------------
export const getSingleUser = async(req, res)=>{
    try{
        const user = await userModel.findOne({email:req.params.email});
        res.status(200).send({
            success: true,
            message: 'User provided with success',
            user,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to get the user',
            error,
        })
    }
};


//----------------- DELETE USER CONTROLLER ------------------
export const deleteUserController = async(req,res)=>{
    try{
        const {id} = req.params
        await userModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'User deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to delete User',
            error
        });
    }

};
