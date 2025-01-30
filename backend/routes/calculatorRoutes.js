// calculatorRoutes.js
const express = require('express');
const calculatorRouter = express.Router();
const {
    getAllCalculators,
    getCalculatorById,
    createCalculator,
    updateCalculator,
    deleteCalculator,
} = require('../controller/calculatorController');

calculatorRouter.get('/', getAllCalculators);
calculatorRouter.get('/:id', getCalculatorById);
calculatorRouter.post('/', createCalculator);
calculatorRouter.put('/:id', updateCalculator);
calculatorRouter.delete('/:id', deleteCalculator);

module.exports = calculatorRouter;