const express = require('express');
const calculatorRouter = express.Router();
const {
    getAllCalculators,
    getCalculatorById,
    createCalculator,
    updateCalculator,
    deleteCalculator,
} = require('../controller/calculatorController');
const { validation, validate } = require('../middleware/validator');

calculatorRouter.get('/', getAllCalculators);
calculatorRouter.get('/:id', getCalculatorById);
calculatorRouter.post('/', validate(CalculatorSchema), createCalculator);
calculatorRouter.patch('/:id', validate(CalculatorSchema.partial()), updateCalculator);
calculatorRouter.delete('/:id', deleteCalculator);

module.exports = calculatorRouter;