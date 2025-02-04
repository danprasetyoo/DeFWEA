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
                inputTreatyDetail: validatedData.inputTreatyDetail ? {
                    connectOrCreate: {
                        where: { id: validatedData.inputTreatyDetail.id || -1 }, // Dummy ID for create
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

        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "ID harus bilangan integer" });
        }

        const calculator = await prisma.calculator.findUnique({ where: { id: Number(id) } });
        if (!calculator) {
            return res.status(404).json({ error: "Data tidak ditemukan" });
        }

        const treatyDetails = await prisma.treatyDetail.findMany({ where: { treatyDetailIdCurrent: calculator.inputTreatyDetail?.id || -1, treatyDetailIdPrior: calculator.inputTreatyDetail?.id || -1 } })
        const layerDetails = await prisma.layerDetail.findMany({ where: { layerDetailIdPdma: calculator.inputLayerDetail?.layerPdma?.id || -1, layerDetailIdMa: calculator.inputLayerDetail?.layerMa?.id || -1, layerDetailIdAv: calculator.inputLayerDetail?.layerAv?.id || -1, layerDetailIdLiability: calculator.inputLayerDetail?.layerLiability?.id || -1 } })
        const premiumDetails = await prisma.premiumDetail.findMany({ where: { premiumIdPdma: calculator.inputPremium?.premiumPdma?.id || -1, premiumIdMa: calculator.inputPremium?.premiumMa?.id || -1, premiumIdAv: calculator.inputPremium?.premiumAv?.id || -1, premiumIdLiability: calculator.inputPremium?.premiumLiability?.id || -1 } })
        const shareDetails = await prisma.shareDetail.findMany({ where: { shareIdPdma: calculator.inputShare?.sharePdma?.id || -1, shareIdMa: calculator.inputShare?.shareMa?.id || -1, shareIdAv: calculator.inputShare?.shareAv?.id || -1, shareIdLiability: calculator.inputShare?.shareLiability?.id || -1 } })

        await prisma.$transaction([
            treatyDetails.length > 0 ? prisma.treatyDetail.deleteMany({ where: { id: { in: treatyDetails.map(td => td.id) } } }) : Promise.resolve(),
            layerDetails.length > 0 ? prisma.layerDetail.deleteMany({ where: { id: { in: layerDetails.map(ld => ld.id) } } }) : Promise.resolve(),
            premiumDetails.length > 0 ? prisma.premiumDetail.deleteMany({ where: { id: { in: premiumDetails.map(pd => pd.id) } } }) : Promise.resolve(),
            shareDetails.length > 0 ? prisma.shareDetail.deleteMany({ where: { id: { in: shareDetails.map(sd => sd.id) } } }) : Promise.resolve(),
            prisma.calculator.delete({ where: { id: Number(id) } }),
        ]);

        res.status(204).end();
    } catch (error) {
        handleError(res, error, 'Gagal menghapus kalkulator');
    }
};


module.exports = {
    createCalculator,
    getAllCalculators,
    getCalculatorById,
    updateCalculator,
    deleteCalculator,
};
