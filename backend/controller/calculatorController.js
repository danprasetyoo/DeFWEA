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
        const validatedData = CalculatorSchema.parse(req.body);

        // 1. Fetch related Detail IDs (same as before)
        const detailPromises = Object.keys(validatedData.inputLayerDetail || {}).map(async (key) => { // Handle potentially null inputLayerDetail
            const detail = await prisma.detail.findUnique({ where: { description: key } });
            if (!detail) {
                throw new Error(`Detail with description '${key}' not found.`); // Important error handling
            }
            return { key, detailId: detail.id };
        });

        const details = await Promise.all(detailPromises);

        const calculator = await prisma.calculator.create({
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                treatyDetails: {
                    create: validatedData.inputTreatyDetail ? { // Conditionally create treatyDetails
                        treatyCurrentYear: validatedData.inputTreatyDetail.treatyCurrentYear,
                        treatyPriorYear: validatedData.inputTreatyDetail.treatyPriorYear,
                    } : undefined,
                },
                layerDetails: {
                    create: Object.keys(validatedData.inputLayerDetail || {}).map(key => ({ // Handle potentially null inputLayerDetail
                        detailId: details.find(d => d.key === key).detailId,
                        detailUsd: validatedData.inputLayerDetail?.[key]?.detailUsd, // Optional chaining
                        detailIdr: validatedData.inputLayerDetail?.[key]?.detailIdr,
                        detailShare: validatedData.inputLayerDetail?.[key]?.detailShare,
                    })),
                },
                premiumDetails: {
                    create: Object.keys(validatedData.inputPremium || {}).map(key => ({ // Handle potentially null inputPremium
                        detailId: details.find(d => d.key === key).detailId,
                        premiumUsd: validatedData.inputPremium?.[key]?.premiumUsd, // Optional chaining
                        premiumIdr: validatedData.inputPremium?.[key]?.premiumIdr,
                        premiumShare: validatedData.inputPremium?.[key]?.premiumShare,
                    })),
                },
                shareDetails: {
                    create: Object.keys(validatedData.inputShare || {}).map(key => ({ // Handle potentially null inputShare
                        detailId: details.find(d => d.key === key).detailId,
                        shareUsd: validatedData.inputShare?.[key]?.shareUsd, // Optional chaining
                        shareIdr: validatedData.inputShare?.[key]?.shareIdr,
                        sharePremiumUsd: validatedData.inputShare?.[key]?.sharePremiumUsd,
                        sharePremiumIdr: validatedData.inputShare?.[key]?.sharePremiumIdr,
                    })),
                },
            },
            include: { // Include related data in the response
                treatyDetails: true,
                layerDetails: true,
                premiumDetails: true,
                shareDetails: true,
            },
        });

        res.status(201).json({ data: calculator });
    } catch (error) {
        console.error('Error creating calculator:', error);
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

        const validatedData = CalculatorSchema.partial().parse(req.body);

        const updatedData = {};

        if (validatedData.inputStatementDate !== undefined) updatedData.inputStatementDate = validatedData.inputStatementDate;
        if (validatedData.inputOpeningfund !== undefined) updatedData.inputOpeningfund = validatedData.inputOpeningfund;
        if (validatedData.inputStatementPeriod !== undefined) updatedData.inputStatementPeriod = validatedData.inputStatementPeriod;
        if (validatedData.inputTreatyYear !== undefined) updatedData.inputTreatyYear = validatedData.inputTreatyYear;

        if (validatedData.inputTreatyDetail) {
            updatedData.treatyDetails = {
                update: {
                    treatyCurrentYear: validatedData.inputTreatyDetail.treatyCurrentYear,
                    treatyPriorYear: validatedData.inputTreatyDetail.treatyPriorYear,
                },
            };
        }

        if (validatedData.inputLayerDetail) {
            const detailPromises = Object.keys(validatedData.inputLayerDetail).map(async (key) => {
                const detail = await prisma.detail.findUnique({ where: { description: key } });
                if (!detail) {
                    throw new Error(`Detail with description '${key}' not found.`);
                }
                return { key, detailId: detail.id };
            });

            const details = await Promise.all(detailPromises);

            updatedData.layerDetails = {
                updateMany: Object.keys(validatedData.inputLayerDetail).map(key => ({
                    where: { detailId: details.find(d => d.key === key).detailId },
                    data: {
                        detailUsd: validatedData.inputLayerDetail[key]?.detailUsd,
                        detailIdr: validatedData.inputLayerDetail[key]?.detailIdr,
                        detailShare: validatedData.inputLayerDetail[key]?.detailShare,
                    },
                })),
            };
        }

        if (validatedData.inputPremium) {
            const detailPromises = Object.keys(validatedData.inputPremium).map(async (key) => {
                const detail = await prisma.detail.findUnique({ where: { description: key } });
                if (!detail) {
                    throw new Error(`Detail with description '${key}' not found.`);
                }
                return { key, detailId: detail.id };
            });

            const details = await Promise.all(detailPromises);

            updatedData.premiumDetails = {
                updateMany: Object.keys(validatedData.inputPremium).map(key => ({
                    where: { detailId: details.find(d => d.key === key).detailId },
                    data: {
                        premiumUsd: validatedData.inputPremium[key]?.premiumUsd,
                        premiumIdr: validatedData.inputPremium[key]?.premiumIdr,
                        premiumShare: validatedData.inputPremium[key]?.premiumShare,
                    },
                })),
            };
        }

        if (validatedData.inputShare) {
            const detailPromises = Object.keys(validatedData.inputShare).map(async (key) => {
                const detail = await prisma.detail.findUnique({ where: { description: key } });
                if (!detail) {
                    throw new Error(`Detail with description '${key}' not found.`);
                }
                return { key, detailId: detail.id };
            });

            const details = await Promise.all(detailPromises);

            updatedData.shareDetails = {
                updateMany: Object.keys(validatedData.inputShare).map(key => ({
                    where: { detailId: details.find(d => d.key === key).detailId },
                    data: {
                        shareUsd: validatedData.inputShare[key]?.shareUsd,
                        shareIdr: validatedData.inputShare[key]?.shareIdr,
                        sharePremiumUsd: validatedData.inputShare[key]?.sharePremiumUsd,
                        sharePremiumIdr: validatedData.inputShare[key]?.sharePremiumIdr,
                    },
                })),
            };
        }


        const updatedCalculator = await prisma.calculator.update({
            where: { id },
            data: updatedData,
            include: {
                treatyDetails: true,
                layerDetails: true,
                premiumDetails: true,
                shareDetails: true,
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