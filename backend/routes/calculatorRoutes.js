const express = require('express');
const calculatorRouter = express.Router();
const {
    getAllCalculators,
    getCalculatorById,
    createCalculator,
    updateCalculator,
    deleteCalculator,
} = require('../controller/calculatorController');
const { validateId, validateCalculator } = require('../middleware/validator');

calculatorRouter.get('/', getAllCalculators);
calculatorRouter.get('/:id', validateId, getCalculatorById);
calculatorRouter.post('/post', validateCalculator, createCalculator);
calculatorRouter.put('/:id', validateId, validateCalculator, updateCalculator);
calculatorRouter.delete('/:id', validateId, deleteCalculator);

module.exports = calculatorRouter;
