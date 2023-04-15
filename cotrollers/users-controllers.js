const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require('../models/user');
const {SECRET_KEY} = process.env;

const register = async(req, res, next)=> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: `Email in use`
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
    
        const result = await User.create({ ...req.body, password: hashPassword });

        res.status(201).json({
            email: result.email,
            subscription: result.subscription,
        })
    }
    catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: `Email or password is wrong`
            })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({
                message: `Email or password is wrong`
            })
        }

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token });


    
        res.status(200).json({
            token,
            user: {
                email,
                subscription: user.subscription,
            },

        })
    }
    catch (error) {
        next(error);
    }
}

const getCurrent = async(req, res, next)=> {
    try {
        const {email, subscription} = req.user;

   res.status(200).json({
            email,
            subscription,
        })
    }
    catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: "" });

        res.status(204).json({
                message: `No content`
            })
    
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    register,
    login,
    getCurrent,
    logout
}