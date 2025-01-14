const express = require('express');
const router = express.Router();
const {
    getAllCalculators,
    getCalculatorById,
    createCalculator,
    updateCalculator,
    deleteCalculator,
} = require('../controller/calculatorController');

// Routes
router.get('/', getAllCalculators);
router.get('/:id', getCalculatorById);
router.post('/', createCalculator);
router.put('/:id', updateCalculator);
router.delete('/:id', deleteCalculator);

module.exports = router;
