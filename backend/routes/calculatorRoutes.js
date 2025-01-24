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

calculatorRouter.get('/calculators', getAllCalculators);
calculatorRouter.get('/calculators/:id', validateId, getCalculatorById);
calculatorRouter.post('/calculators', validateCalculator, createCalculator);
calculatorRouter.post('/calculators/post', validateCalculator, createCalculator);
calculatorRouter.put('/calculators/:id', validateId, validateCalculator, updateCalculator);
calculatorRouter.delete('/calculators/:id', validateId, deleteCalculator);

module.exports = calculatorRouter;
