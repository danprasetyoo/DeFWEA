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

    if (error.code === 'P2025') { // Record not found
        return res.status(404).json({ error: 'Record not found' });
    }

    if (error.code === 'P2002') { // Unique constraint violation
        return res.status(400).json({ error: 'Unique constraint violation' });
    }

    res.status(500).json({ error: defaultMessage });
};

const createCalculator = async (req, res) => {
    try {
        const result = CalculatorSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: 'Validation Error',
                details: result.error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            });
        }

        const validatedData = result.data;
        const calculator = await prisma.calculator.create({
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                inputTreatyDetail: validatedData.inputTreatyDetail ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputTreatyDetail.id || -1 },
                        create: validatedData.inputTreatyDetail
                    },
                } : undefined,
                inputLayerDetail: validatedData.inputLayerDetail ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputLayerDetail.id || -1 },
                        create: validatedData.inputLayerDetail
                    },
                } : undefined,
                inputPremium: validatedData.inputPremium ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputPremium.id || -1 },
                        create: validatedData.inputPremium
                    },
                } : undefined,
                inputShare: validatedData.inputShare ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputShare.id || -1 },
                        create: validatedData.inputShare
                    },
                } : undefined,
            },
            include: {
                inputTreatyDetail: { include: { treatyCurrentYear: true, treatyPriorYear: true } },
                inputLayerDetail: { include: { layerPdma: true, layerMa: true, layerAv: true, layerLiability: true } },
                inputPremium: { include: { premiumPdma: true, premiumMa: true, premiumAv: true, premiumLiability: true } },
                inputShare: { include: { sharePdma: true, shareMa: true, shareAv: true, shareLiability: true } },
            },
        });

        res.status(201).json({ data: calculator });
    } catch (error) {
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

const updateCalculator = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const result = CalculatorSchema.partial().safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: 'Validation Error',
                details: result.error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            });
        }

        const validatedData = result.data;
        const updatedCalculator = await prisma.calculator.update({
            where: { id },
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                inputTreatyDetail: validatedData.inputTreatyDetail ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputTreatyDetail.id || -1 },
                        create: validatedData.inputTreatyDetail
                    },
                } : undefined,
                inputLayerDetail: validatedData.inputLayerDetail ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputLayerDetail.id || -1 },
                        create: validatedData.inputLayerDetail
                    },
                } : undefined,
                inputPremium: validatedData.inputPremium ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputPremium.id || -1 },
                        create: validatedData.inputPremium
                    },
                } : undefined,
                inputShare: validatedData.inputShare ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputShare.id || -1 },
                        create: validatedData.inputShare
                    },
                } : undefined,
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
};
