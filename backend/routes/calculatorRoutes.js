const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

router.get('/', calculatorController.getAllCalculators);
router.get('/:id', calculatorController.getCalculatorById);
router.post('/', calculatorController.createCalculator);
router.put('/:id', calculatorController.updateCalculator);
router.delete('/:id', calculatorController.deleteCalculator);

module.exports = router;
