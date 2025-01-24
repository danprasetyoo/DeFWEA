const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllCalculators = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const calculators = await prisma.calculator.findMany({
            skip: (page - 1) * limit,
            take: parseInt(limit),
        });
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
                inputOpeningfund: inputOpeningfund.toString(),
                inputStatementPeriod: new Date(inputStatementPeriod),
                inputTreatyYear: parseInt(inputTreatyYear),
                inputTreatyDetail: {
                    create: inputTreatyDetail.map(detail => ({
                        treatyCurrentYear: {
                            create: detail.treatyCurrentYear,
                        },
                        treatyPriorYear: {
                            create: detail.treatyPriorYear,
                        },
                        version: detail.version,
                    })),
                },
                inputLayerDetail: {
                    create: inputLayerDetail,
                },
                inputPremiumDetail: {
                    create: inputPremium,
                },
                inputShareDetail: {
                    create: inputShare,
                },
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
                inputStatementDate,
                inputOpeningfund: inputOpeningfund.toString(),
                inputStatementPeriod,
                inputTreatyYear: parseInt(inputTreatyYear),
                inputTreatyDetail: {
                    update: inputTreatyDetail.map(detail => ({
                        treatyCurrentYear: {
                            update: detail.treatyCurrentYear,
                        },
                        treatyPriorYear: {
                            update: detail.treatyPriorYear,
                        },
                        version: detail.version,
                    })),
                },
                inputLayerDetail: {
                    update: inputLayerDetail,
                },
                inputPremiumDetail: {
                    update: inputPremium,
                },
                inputShareDetail: {
                    update: inputShare,
                },
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