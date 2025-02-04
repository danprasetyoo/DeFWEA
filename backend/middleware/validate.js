const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Validate req.body
        next(); // If validation passes, continue to the next middleware/handler
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: 'Validation Error',
                details: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            });
        } else {
            res.status(400).json({ error: "Validation failed" });
        }
    }
};

module.exports = { validate };