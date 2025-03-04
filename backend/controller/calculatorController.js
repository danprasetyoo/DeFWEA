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
        console.log('Request body:', req.body);
        const validatedData = CalculatorSchema.parse(req.body);
        console.log('Validated data:', validatedData);

        const calculator = await prisma.calculator.create({
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                inputTreatyDetail: validatedData.inputTreatyDetail ? {
                    create: {
                        treatyCurrentYear: validatedData.inputTreatyDetail.treatyCurrentYear ? {
                            Exchange: validatedData.inputTreatyDetail.treatyCurrentYear.Exchange,
                            Margin: validatedData.inputTreatyDetail.treatyCurrentYear.Margin,
                            Brokerage: validatedData.inputTreatyDetail.treatyCurrentYear.Brokerage,
                            Interest: validatedData.inputTreatyDetail.treatyCurrentYear.Interest,
                            LAP: validatedData.inputTreatyDetail.treatyCurrentYear.LAP,
                            Maintenance: validatedData.inputTreatyDetail.treatyCurrentYear.Maintenance,
                        } : undefined,
                        treatyPriorYear: validatedData.inputTreatyDetail.treatyPriorYear ? {
                            Exchange: validatedData.inputTreatyDetail.treatyPriorYear.Exchange,
                            Margin: validatedData.inputTreatyDetail.treatyPriorYear.Margin,
                            Brokerage: validatedData.inputTreatyDetail.treatyPriorYear.Brokerage,
                            Interest: validatedData.inputTreatyDetail.treatyPriorYear.Interest,
                            LAP: validatedData.inputTreatyDetail.treatyPriorYear.LAP,
                            Maintenance: validatedData.inputTreatyDetail.treatyPriorYear.Maintenance,
                        } : undefined,
                    },
                } : undefined,
                inputLayerDetail: validatedData.inputLayerDetail ? {
                    create: {
                        layerPdma: validatedData.inputLayerDetail.layerPdma ? {
                            detailUsd: validatedData.inputLayerDetail.layerPdma.detailUsd,
                            detailIdr: validatedData.inputLayerDetail.layerPdma.detailIdr,
                            detailShare: validatedData.inputLayerDetail.layerPdma.detailShare,
                        } : undefined,
                        layerMa: validatedData.inputLayerDetail.layerMa ? {
                            detailUsd: validatedData.inputLayerDetail.layerMa.detailUsd,
                            detailIdr: validatedData.inputLayerDetail.layerMa.detailIdr,
                            detailShare: validatedData.inputLayerDetail.layerMa.detailShare,
                        } : undefined,
                        layerAv: validatedData.inputLayerDetail.layerAv ? {
                            detailUsd: validatedData.inputLayerDetail.layerAv.detailUsd,
                            detailIdr: validatedData.inputLayerDetail.layerAv.detailIdr,
                            detailShare: validatedData.inputLayerDetail.layerAv.detailShare,
                        } : undefined,
                        layerLiability: validatedData.inputLayerDetail.layerLiability ? {
                            detailUsd: validatedData.inputLayerDetail.layerLiability.detailUsd,
                            detailIdr: validatedData.inputLayerDetail.layerLiability.detailIdr,
                            detailShare: validatedData.inputLayerDetail.layerLiability.detailShare,
                        } : undefined,
                    },
                } : undefined,
                inputPremium: validatedData.inputPremium ? {
                    create: {
                        premiumPdma: validatedData.inputPremium.premiumPdma ? {
                            premiumUsd: validatedData.inputPremium.premiumPdma.premiumUsd,
                            premiumIdr: validatedData.inputPremium.premiumPdma.premiumIdr,
                            premiumShare: validatedData.inputPremium.premiumPdma.premiumShare,
                        } : undefined,
                        premiumMa: validatedData.inputPremium.premiumMa ? {
                            premiumUsd: validatedData.inputPremium.premiumMa.premiumUsd,
                            premiumIdr: validatedData.inputPremium.premiumMa.premiumIdr,
                            premiumShare: validatedData.inputPremium.premiumMa.premiumShare,
                        } : undefined,
                        premiumAv: validatedData.inputPremium.premiumAv ? {
                            premiumUsd: validatedData.inputPremium.premiumAv.premiumUsd,
                            premiumIdr: validatedData.inputPremium.premiumAv.premiumIdr,
                            premiumShare: validatedData.inputPremium.premiumAv.premiumShare,
                        } : undefined,
                        premiumLiability: validatedData.inputPremium.premiumLiability ? {
                            premiumUsd: validatedData.inputPremium.premiumLiability.premiumUsd,
                            premiumIdr: validatedData.inputPremium.premiumLiability.premiumIdr,
                            premiumShare: validatedData.inputPremium.premiumLiability.premiumShare,
                        } : undefined,
                    },
                } : undefined,
                inputShare: validatedData.inputShare ? {
                    create: {
                        sharePdma: validatedData.inputShare.sharePdma ? {
                            shareUsd: validatedData.inputShare.sharePdma.shareUsd,
                            shareIdr: validatedData.inputShare.sharePdma.shareIdr,
                            sharePremiumUsd: validatedData.inputShare.sharePdma.sharePremiumUsd,
                            sharePremiumIdr: validatedData.inputShare.sharePdma.sharePremiumIdr,
                        } : undefined,
                        shareMa: validatedData.inputShare.shareMa ? {
                            shareUsd: validatedData.inputShare.shareMa.shareUsd,
                            shareIdr: validatedData.inputShare.shareMa.shareIdr,
                            sharePremiumUsd: validatedData.inputShare.shareMa.sharePremiumUsd,
                            sharePremiumIdr: validatedData.inputShare.shareMa.sharePremiumIdr,
                        } : undefined,
                        shareAv: validatedData.inputShare.shareAv ? {
                            shareUsd: validatedData.inputShare.shareAv.shareUsd,
                            shareIdr: validatedData.inputShare.shareAv.shareIdr,
                            sharePremiumUsd: validatedData.inputShare.shareAv.sharePremiumUsd,
                            sharePremiumIdr: validatedData.inputShare.shareAv.sharePremiumIdr,
                        } : undefined,
                        shareLiability: validatedData.inputShare.shareLiability ? {
                            shareUsd: validatedData.inputShare.shareLiability.shareUsd,
                            shareIdr: validatedData.inputShare.shareLiability.shareIdr,
                            sharePremiumUsd: validatedData.inputShare.shareLiability.sharePremiumUsd,
                            sharePremiumIdr: validatedData.inputShare.shareLiability.sharePremiumIdr,
                        } : undefined,
                    },
                } : undefined,
            },
            include: {
                inputTreatyDetail: {
                    include: {
                        treatyCurrentYear: true,
                        treatyPriorYear: true,
                    },
                },
                inputLayerDetail: {
                    include: {
                        layerPdma: true,
                        layerMa: true,
                        layerAv: true,
                        layerLiability: true,
                    },
                },
                inputPremium: {
                    include: {
                        premiumPdma: true,
                        premiumMa: true,
                        premiumAv: true,
                        premiumLiability: true,
                    },
                },
                inputShare: {
                    include: {
                        sharePdma: true,
                        shareMa: true,
                        shareAv: true,
                        shareLiability: true,
                    },
                },
            },
        });

        console.log('Calculator created:', calculator);
        res.status(201).json({ data: calculator });
    } catch (error) {
        console.error('Error creating calculator:', error);
        if (error.meta && error.meta.target) {
            console.error('Error target:', error.meta.target);
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