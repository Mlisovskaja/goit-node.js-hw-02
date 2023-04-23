const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        required: true,
    },
    token: String
});

const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}