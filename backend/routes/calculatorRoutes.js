const express = require('express');
const calculatorRouter = express.Router();
const {
    getAllCalculators,
    getCalculatorById,
    createCalculator,
    updateCalculator,
    deleteCalculator,
} = require('../controller/calculatorController');
const { CalculatorSchema } = require('../middleware/validator');
const { validate } = require('../middleware/validate');

calculatorRouter.get('/', getAllCalculators);
calculatorRouter.get('/:id', getCalculatorById);
calculatorRouter.post('/', validate(CalculatorSchema), createCalculator);
calculatorRouter.patch('/:id', validate(CalculatorSchema.partial()), updateCalculator);
calculatorRouter.delete('/:id', deleteCalculator);

module.exports = calculatorRouter;