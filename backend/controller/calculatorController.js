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

        const calculator = await prisma.calculator.create({
            data: {
                inputStatementDate: validatedData.inputStatementDate,
                inputOpeningfund: validatedData.inputOpeningfund,
                inputStatementPeriod: validatedData.inputStatementPeriod,
                inputTreatyYear: validatedData.inputTreatyYear,
                version: validatedData.version,
                TreatyYear: validatedData.treatyYear ? {
                    create: {
                        treatyDetailIdCurrent: validatedData.treatyYear.treatyDetailIdCurrent,
                        treatyDetailIdPrior: validatedData.treatyYear.treatyDetailIdPrior,
                    }
                } : undefined,
                Layer: validatedData.layer ? {
                    create: {
                        layerDetailIdPdma: validatedData.layer.layerDetailIdPdma,
                        layerDetailIdMa: validatedData.layer.layerDetailIdMa,
                        layerDetailIdAv: validatedData.layer.layerDetailIdAv,
                        layerDetailIdLiability: validatedData.layer.layerDetailIdLiability,
                    }
                } : undefined,
                Premium: validatedData.premium ? {
                    create: {
                        premiumIdPdma: validatedData.premium.premiumIdPdma,
                        premiumIdMa: validatedData.premium.premiumIdMa,
                        premiumIdAv: validatedData.premium.premiumIdAv,
                        premiumIdLiability: validatedData.premium.premiumIdLiability,
                    }
                } : undefined,
                Share: validatedData.share ? {
                    create: {
                        shareIdPdma: validatedData.share.shareIdPdma,
                        shareIdMa: validatedData.share.shareIdMa,
                        shareIdAv: validatedData.share.shareIdAv,
                        shareIdLiability: validatedData.share.shareIdLiability,
                    }
                } : undefined,
            },
            include: {
                TreatyYear: true,
                Layer: true,
                Premium: true,
                Share: true,
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
                    TreatyYear: true,
                    Layer: true,
                    Premium: true,
                    Share: true,
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
                TreatyYear: true,
                Layer: true,
                Premium: true,
                Share: true,
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
                TreatyYear: true,
                Layer: true,
                Premium: true,
                Share: true,
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
                version: validatedData.version,
                TreatyYear: validatedData.treatyYear ? {
                    update: {
                        treatyDetailIdCurrent: validatedData.treatyYear.treatyDetailIdCurrent,
                        treatyDetailIdPrior: validatedData.treatyYear.treatyDetailIdPrior,
                    }
                } : undefined,
                Layer: validatedData.layer ? {
                    update: {
                        layerDetailIdPdma: validatedData.layer.layerDetailIdPdma,
                        layerDetailIdMa: validatedData.layer.layerDetailIdMa,
                        layerDetailIdAv: validatedData.layer.layerDetailIdAv,
                        layerDetailIdLiability: validatedData.layer.layerDetailIdLiability,
                    }
                } : undefined,
                Premium: validatedData.premium ? {
                    update: {
                        premiumIdPdma: validatedData.premium.premiumIdPdma,
                        premiumIdMa: validatedData.premium.premiumIdMa,
                        premiumIdAv: validatedData.premium.premiumIdAv,
                        premiumIdLiability: validatedData.premium.premiumIdLiability,
                    }
                } : undefined,
                Share: validatedData.share ? {
                    update: {
                        shareIdPdma: validatedData.share.shareIdPdma,
                        shareIdMa: validatedData.share.shareIdMa,
                        shareIdAv: validatedData.share.shareIdAv,
                shareIdLiability: validatedData.share.shareIdLiability,
            }
        } : undefined,
            },
            include: {
                TreatyYear: true,
                Layer: true,
                Premium: true,
                Share: true,
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
    getCalculatorByVersion,
};