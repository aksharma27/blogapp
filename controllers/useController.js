const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //validation 
        if (!username || !email || !password) {
            res.status(400).send({
                success: false,
                message : "Please enter all fields"
            })
        }

        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(401).sendI({
                success : false,
                message : "User already exists"
            })
        }

        //hash password 
        const hashedPassword = await bcrypt.hash(password, 10);
        // password = hashedPassword;

        //save new user
        const user = new userModel({username, email, password:hashedPassword})
        await user.save();
        return res.status(200).send({
            success : true,
            message : "New user created",
            user
        })
    } 
    catch (e) {
        console.log(e);
        return res.status
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount : users.length,
            success: true,
            message: "all users data", 
            users
        })
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message : e.message,
            success : false,
            e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success : false,
                message : 'Please provide email or password'
            })
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success: false,
                message : "email is not registered"
            })
        }

        const isMatch = await  bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).send({
                success: false,
                message : "Invalid username or password"
            })
        }

        return res.status(200).send({
            success: true, 
            message: "login successful",
            user,
        })
    } catch (e) {
        console.log (e);
        return res.status(500).send({
            success : false,
            message : "error in login callback",
            e
        })
    }
}

module.exports = {getAllUsers, registerUser, loginUser};