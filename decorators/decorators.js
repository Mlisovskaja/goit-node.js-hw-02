const validateBody = schema => {
    const func = async(req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            next(res.status(400).json({
                message: `Missing required name field`
            }))
        }
        next();
    }

    return func;
}

module.exports = validateBody;
