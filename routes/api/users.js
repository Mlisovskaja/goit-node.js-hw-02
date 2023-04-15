const express = require('express');
const router = express.Router();
const ctrl = require('../../cotrollers/users-controllers');
const validateBody = require('../../decorators/decorators');
const Authorization = require('../../decorators/authorization')
const { schemas } = require('../../models/user');

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", Authorization, ctrl.getCurrent);

router.post("/logout", Authorization, ctrl.logout);

module.exports = router;