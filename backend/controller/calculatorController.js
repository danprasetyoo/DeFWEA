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
        const validatedData = CalculatorSchema.parse(req.body);

        const calculator = await prisma.calculator.create({
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                inputTreatyDetail: {
                    create: validatedData.inputTreatyDetail ? {
                        treatyCurrentYear: { create: validatedData.inputTreatyDetail.treatyCurrentYear },
                        treatyPriorYear: { create: validatedData.inputTreatyDetail.treatyPriorYear },
                    } : undefined,
                },
                inputLayerDetail: {
                    create: validatedData.inputLayerDetail ? {
                        layerPdma: { create: validatedData.inputLayerDetail.layerPdma },
                        layerMa: { create: validatedData.inputLayerDetail.layerMa },
                        layerAv: { create: validatedData.inputLayerDetail.layerAv },
                        layerLiability: { create: validatedData.inputLayerDetail.layerLiability },
                    } : undefined,
                },
                inputPremium: {
                    create: validatedData.inputPremium ? {
                        premiumPdma: { create: validatedData.inputPremium.premiumPdma },
                        premiumMa: { create: validatedData.inputPremium.premiumMa },
                        premiumAv: { create: validatedData.inputPremium.premiumAv },
                        premiumLiability: { create: validatedData.inputPremium.premiumLiability },
                    } : undefined,
                },
                inputShare: {
                    create: validatedData.inputShare ? {
                        sharePdma: { create: validatedData.inputShare.sharePdma },
                        shareMa: { create: validatedData.inputShare.shareMa },
                        shareAv: { create: validatedData.inputShare.shareAv },
                        shareLiability: { create: validatedData.inputShare.shareLiability },
                    } : undefined,
                },
            },
            include: { // Include related data for a complete response
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

        const calculators = await prisma.calculator.findMany({
            skip: (page - 1) * Number(limit),
            take: Number(limit),
            orderBy: { createdAt: 'desc' },
            include: {
                inputTreatyDetail: { include: { treatyCurrentYear: true, treatyPriorYear: true } },
                inputLayerDetail: { include: { layerPdma: true, layerMa: true, layerAv: true, layerLiability: true } },
                inputPremium: { include: { premiumPdma: true, premiumMa: true, premiumAv: true, premiumLiability: true } },
                inputShare: { include: { sharePdma: true, shareMa: true, shareAv: true, shareLiability: true } },
            },
        });

        res.status(200).json(calculators);

    } catch (error) {
        handleError(res, error, 'Failed to fetch calculators');
    }
};

const getCalculatorById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const calculator = await prisma.calculator.findUnique({
            where: { id: parseInt(id) },
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
        const { id } = req.params;
        const validatedData = CalculatorSchema.partial().parse(req.body);

        const updatedCalculator = await prisma.calculator.update({
            where: { id: Number(id) },
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                inputTreatyDetail: validatedData.inputTreatyDetail ? {
                    update: {
                        treatyCurrentYear: validatedData.inputTreatyDetail.treatyCurrentYear ? {
                            update: validatedData.inputTreatyDetail.treatyCurrentYear,
                        } : undefined,
                        treatyPriorYear: validatedData.inputTreatyDetail.treatyPriorYear ? {
                            update: validatedData.inputTreatyDetail.treatyPriorYear,
                        } : undefined,
                    },
                } : undefined,
                inputLayerDetail: validatedData.inputLayerDetail ? {
                    update: {
                        layerPdma: validatedData.inputLayerDetail.layerPdma ? {
                            update: validatedData.inputLayerDetail.layerPdma,
                        } : undefined,
                        layerMa: validatedData.inputLayerDetail.layerMa ? {
                            update: validatedData.inputLayerDetail.layerMa,
                        } : undefined,
                        layerAv: validatedData.inputLayerDetail.layerAv ? {
                            update: validatedData.inputLayerDetail.layerAv,
                        } : undefined,
                        layerLiability: validatedData.inputLayerDetail.layerLiability ? {
                            update: validatedData.inputLayerDetail.layerLiability,
                        } : undefined,
                    },
                } : undefined,
                inputPremium: validatedData.inputPremium ? {
                    update: {
                        premiumPdma: validatedData.inputPremium.premiumPdma ? {
                            update: validatedData.inputPremium.premiumPdma,
                        } : undefined,
                        premiumMa: validatedData.inputPremium.premiumMa ? {
                            update: validatedData.inputPremium.premiumMa,
                        } : undefined,
                        premiumAv: validatedData.inputPremium.premiumAv ? {
                            update: validatedData.inputPremium.premiumAv,
                        } : undefined,
                        // ... (lanjutan dari kode sebelumnya)

                        premiumLiability: validatedData.inputPremium.premiumLiability ? {
                            update: validatedData.inputPremium.premiumLiability,
                        } : undefined,
                    },
                } : undefined,
                inputShare: validatedData.inputShare ? {
                    update: {
                        sharePdma: validatedData.inputShare.sharePdma ? {
                            update: validatedData.inputShare.sharePdma,
                        } : undefined,
                        shareMa: validatedData.inputShare.shareMa ? {
                            update: validatedData.inputShare.shareMa,
                        } : undefined,
                        shareAv: validatedData.inputShare.shareAv ? {
                            update: validatedData.inputShare.shareAv,
                        } : undefined,
                        shareLiability: validatedData.inputShare.shareLiability ? {
                            update: validatedData.inputShare.shareLiability,
                        } : undefined,
                    },
                } : undefined,
            },
            include: { // Include related data for a complete response (same as create)
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
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        await prisma.calculator.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).end(); // 204 No Content is appropriate for successful delete

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