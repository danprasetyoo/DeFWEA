const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllCalculators = async (req, res) => {
    try {
        const calculators = await prisma.calculator.findMany();
        res.status(200).json(calculators);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCalculatorById = async (req, res) => {
    try {
        const { id } = req.params;
        const calculator = await prisma.calculator.findUnique({
            where: { id: parseInt(id) },
        });

        if (!calculator) {
            return res.status(404).json({ error: 'Calculator not found' });
        }

        res.status(200).json(calculator);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCalculator = async (req, res) => {
    try {
        const { inputStatementDate, inputOpeningfund, inputStatementPeriod, inputTreatyYear, inputTreatyDetail, inputLayerDetail, inputPremium, inputShare } = req.body;

        const newCalculator = await prisma.calculator.create({
            data: {
                inputStatementDate: new Date(inputStatementDate),
                inputOpeningfund,
                inputStatementPeriod: new Date(inputStatementPeriod),
                inputTreatyYear,
                inputTreatyDetail: inputTreatyDetail ? JSON.stringify(inputTreatyDetail) : null,
                inputLayerDetail: inputLayerDetail ? JSON.stringify(inputLayerDetail) : null,
                inputPremium: inputPremium ? JSON.stringify(inputPremium) : null,
                inputShare: inputShare ? JSON.stringify(inputShare) : null,
            },
        });

        res.status(201).json(newCalculator);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCalculator = async (req, res) => {
    try {
        const { id } = req.params;
        const { inputStatementDate, inputOpeningfund, inputStatementPeriod, inputTreatyYear, inputTreatyDetail, inputLayerDetail, inputPremium, inputShare } = req.body;

        const updatedCalculator = await prisma.calculator.update({
            where: { id: parseInt(id) },
            data: {
                inputStatementDate: new Date(inputStatementDate),
                inputOpeningfund,
                inputStatementPeriod: new Date(inputStatementPeriod),
                inputTreatyYear,
                inputTreatyDetail: inputTreatyDetail ? JSON.stringify(inputTreatyDetail) : null,
                inputLayerDetail: inputLayerDetail ? JSON.stringify(inputLayerDetail) : null,
                inputPremium: inputPremium ? JSON.stringify(inputPremium) : null,
                inputShare: inputShare ? JSON.stringify(inputShare) : null,
            },
        });

        res.status(200).json(updatedCalculator);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCalculator = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.calculator.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Calculator deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
