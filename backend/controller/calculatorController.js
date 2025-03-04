const { PrismaClient } = require('@prisma/client');
const { CalculatorSchema } = require('../middleware/validator');
const { z } = require('zod');

const prisma = new PrismaClient();

const handleError = (res, error, defaultMessage) => {
    console.error(`[${new Date().toISOString()}] Error:`, error);

    if (error instanceof z.ZodError) {
        return res.status(400).json({
            error: 'Validation Error',
            details: error.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
    }

    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Record not found' });
    }

    if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Unique constraint violation' });
    }

    res.status(500).json({ error: defaultMessage });
};

const createCalculator = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Add logging for request body
        const validatedData = CalculatorSchema.parse(req.body);
        console.log('Validated data:', validatedData); // Add logging for validated data

        const calculator = await prisma.calculator.create({
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                inputTreatyDetail: validatedData.inputTreatyDetail ? {
                    create: {
                        treatyCurrentYear: validatedData.inputTreatyDetail.treatyCurrentYear,
                        treatyPriorYear: validatedData.inputTreatyDetail.treatyPriorYear,
                    },
                } : undefined,
                inputLayerDetail: validatedData.inputLayerDetail ? {
                    create: {
                        layerPdma: validatedData.inputLayerDetail.layerPdma,
                        layerMa: validatedData.inputLayerDetail.layerMa,
                        layerAv: validatedData.inputLayerDetail.layerAv,
                        layerLiability: validatedData.inputLayerDetail.layerLiability,
                    },
                } : undefined,
                inputPremium: validatedData.inputPremium ? {
                    create: {
                        premiumPdma: validatedData.inputPremium.premiumPdma,
                        premiumMa: validatedData.inputPremium.premiumMa,
                        premiumAv: validatedData.inputPremium.premiumAv,
                        premiumLiability: validatedData.inputPremium.premiumLiability,
                    },
                } : undefined,
                inputShare: validatedData.inputShare ? {
                    create: {
                        sharePdma: validatedData.inputShare.sharePdma,
                        shareMa: validatedData.inputShare.shareMa,
                        shareAv: validatedData.inputShare.shareAv,
                        shareLiability: validatedData.inputShare.shareLiability,
                    },
                } : undefined,
            },
            include: {
                inputTreatyDetail: true,
                inputLayerDetail: true,
                inputPremium: true,
                inputShare: true,
            },
        });

        console.log('Calculator created:', calculator); // Add logging for created calculator
        res.status(201).json({ data: calculator });
    } catch (error) {
        console.error('Error creating calculator:', error);
        if (error.meta && error.meta.target) {
            console.error('Error target:', error.meta.target); // Add logging for error target
        }
        handleError(res, error, 'Failed to create calculator');
    }
};

const getAllCalculators = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const [total, calculators] = await prisma.$transaction([
            prisma.calculator.count(),
            prisma.calculator.findMany({
                skip: (page - 1) * Number(limit),
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
                include: {
                    inputTreatyDetail: { include: { treatyCurrentYear: true, treatyPriorYear: true } },
                    inputLayerDetail: { include: { layerPdma: true, layerMa: true, layerAv: true, layerLiability: true } },
                    inputPremium: { include: { premiumPdma: true, premiumMa: true, premiumAv: true, premiumLiability: true } },
                    inputShare: { include: { sharePdma: true, shareMa: true, shareAv: true, shareLiability: true } },
                },
            })
        ]);

        res.set('X-Total-Count', total.toString());
        res.status(200).json(calculators);
    } catch (error) {
        handleError(res, error, 'Failed to fetch calculators');
    }
};

const getCalculatorById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const calculator = await prisma.calculator.findUnique({
            where: { id },
            include: {
                inputTreatyDetail: { include: { treatyCurrentYear: true, treatyPriorYear: true } },
                inputLayerDetail: { include: { layerPdma: true, layerMa: true, layerAv: true, layerLiability: true } },
                inputPremium: { include: { premiumPdma: true, premiumMa: true, premiumAv: true, premiumLiability: true } },
                inputShare: { include: { sharePdma: true, shareMa: true, shareAv: true, shareLiability: true } },
            },
        });

        if (!calculator) {
            return res.status(404).json({ error: 'Calculator not found' });
        }

        res.status(200).json(calculator);
    } catch (error) {
        handleError(res, error, 'Failed to fetch calculator');
    }
};

const getCalculatorByVersion = async (req, res) => {
    try {
        const { version } = req.params;
        if (!version) {
            return res.status(400).json({ error: "Invalid version format" });
        }

        const calculator = await prisma.calculator.findFirst({
            where: { version },
            include: {
                inputTreatyDetail: { include: { treatyCurrentYear: true, treatyPriorYear: true } },
                inputLayerDetail: { include: { layerPdma: true, layerMa: true, layerAv: true, layerLiability: true } },
                inputPremium: { include: { premiumPdma: true, premiumMa: true, premiumAv: true, premiumLiability: true } },
                inputShare: { include: { sharePdma: true, shareMa: true, shareAv: true, shareLiability: true } },
            },
        });

        if (!calculator) {
            return res.status(404).json({ error: 'Calculator not found' });
        }

        res.status(200).json(calculator);
    } catch (error) {
        handleError(res, error, 'Failed to fetch calculator by version');
    }
};

const updateCalculator = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const validatedData = CalculatorSchema.partial().parse(req.body);

        const updatedCalculator = await prisma.calculator.update({
            where: { id },
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                inputTreatyDetail: validatedData.inputTreatyDetail,
                inputLayerDetail: validatedData.inputLayerDetail,
                inputPremium: validatedData.inputPremium,
                inputShare: validatedData.inputShare,
            },
            include: {
                inputTreatyDetail: { include: { treatyCurrentYear: true, treatyPriorYear: true } },
                inputLayerDetail: { include: { layerPdma: true, layerMa: true, layerAv: true, layerLiability: true } },
                inputPremium: { include: { premiumPdma: true, premiumMa: true, premiumAv: true, premiumLiability: true } },
                inputShare: { include: { sharePdma: true, shareMa: true, shareAv: true, shareLiability: true } },
            },
        });

        res.status(200).json({ data: updatedCalculator });
    } catch (error) {
        handleError(res, error, 'Failed to update calculator');
    }
};

const deleteCalculator = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const calculator = await prisma.calculator.findUnique({ where: { id } });
        if (!calculator) {
            return res.status(404).json({ error: "Calculator not found" });
        }

        await prisma.calculator.delete({ where: { id } });

        res.status(204).end();
    } catch (error) {
        handleError(res, error, 'Failed to delete calculator');
    }
};

module.exports = {
    createCalculator,
    getAllCalculators,
    getCalculatorById,
    updateCalculator,
    deleteCalculator,
    getCalculatorByVersion, // Add the new function to the exports
};