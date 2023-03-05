import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../helpers/authHelper.js';
import JWT  from 'jsonwebtoken';
export const registerController = async(req,res)=>{
    try{
        const {name,email,password,phone,adress} = req.body
        //validation
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
        //Check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).json({
                success: true,
                message: 'User already existing please login'
            });
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save user
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

//POST LOGIN
export const loginController = async (req,res)=>{
    try{
        const {email, password} = req.body
        //validation 
        if(!email || !password){
           return res.status(404).send({
            success: false,
            message: 'INVALID EMAIL OR PASSWORD'
           })
        }
        //check user
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
        //token
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
//test controller
export const testController = (req,res)=>{
    res.send('protected Route')
};

