const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { CalculatorSchema } = require('../middleware/validator');

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

        calculator.inputTreatyDetail = calculator.inputTreatyDetail ? JSON.parse(calculator.inputTreatyDetail) : null;
        calculator.inputLayerDetail = calculator.inputLayerDetail ? JSON.parse(calculator.inputLayerDetail) : null;
        calculator.inputPremium = calculator.inputPremium ? JSON.parse(calculator.inputPremium) : null;
        calculator.inputShare = calculator.inputShare ? JSON.parse(calculator.inputShare) : null;

        res.status(200).json(calculator);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Calculator not found' });
        }
        console.error("Error fetching calculator by ID:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createCalculator = async (req, res) => {
    try {
        const validatedData = CalculatorSchema.parse(req.body);

        const {
            inputStatementDate,
            inputOpeningfund,
            inputStatementPeriod,
            inputTreatyYear,
            inputTreatyDetail,
            inputLayerDetail,
            inputPremiumDetail,
            inputShareDetail,
        } = validatedData;

        if (!inputStatementDate || !inputStatementPeriod || !inputTreatyYear) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await prisma.$transaction(async (prisma) => {
            const calculator = await prisma.calculator.create({
                data: {
                    inputStatementDate: new Date(inputStatementDate),
                    inputOpeningfund,
                    inputStatementPeriod: new Date(inputStatementPeriod),
                    inputTreatyYear,
                    version: 1,
                },
            });

            if (inputTreatyDetail) {
                const treatyDetail = await prisma.treatyDetail.create({
                    data: {
                        calculatorId: calculator.id,
                        treatyCurrentYear: inputTreatyDetail.treatyCurrentYear
                            ? {
                                create: {
                                    currentExchange: inputTreatyDetail.treatyCurrentYear.currentExchange,
                                    currentMargin: inputTreatyDetail.treatyCurrentYear.currentMargin,
                                    currentBrokerage: inputTreatyDetail.treatyCurrentYear.currentBrokerage,
                                    currentInterest: inputTreatyDetail.treatyCurrentYear.currentInterest,
                                    currentLAP: inputTreatyDetail.treatyCurrentYear.currentLAP,
                                    currentMaintenance: inputTreatyDetail.treatyCurrentYear.currentMaintenance,
                                },
                            }
                            : undefined,
                        treatyPriorYear: inputTreatyDetail.treatyPriorYear
                            ? {
                                create: {
                                    priorExchange: inputTreatyDetail.treatyPriorYear.priorExchange,
                                    priorMargin: inputTreatyDetail.treatyPriorYear.priorMargin,
                                    priorBrokerage: inputTreatyDetail.treatyPriorYear.priorBrokerage,
                                    priorInterest: inputTreatyDetail.treatyPriorYear.priorInterest,
                                    priorLAP: inputTreatyDetail.treatyPriorYear.priorLAP,
                                    priorMaintenance: inputTreatyDetail.treatyPriorYear.priorMaintenance,
                                },
                            }
                            : undefined,
                    },
                });
            }

            if (inputLayerDetail) {
                const layerDetail = await prisma.layerDetail.create({
                    data: {
                        calculatorId: calculator.id,
                        pdmaLayer: inputLayerDetail.pdmaLayer
                            ? {
                                create: {
                                    pdmaDetailUsd: inputLayerDetail.pdmaLayer.pdmaDetailUsd,
                                    pdmaDetailIdr: inputLayerDetail.pdmaLayer.pdmaDetailIdr,
                                    pdmaDetailShare: inputLayerDetail.pdmaLayer.pdmaDetailShare,
                                },
                            }
                            : undefined,
                        maLayer: inputLayerDetail.maLayer
                            ? {
                                create: {
                                    maDetailUsd: inputLayerDetail.maLayer.maDetailUsd,
                                    maDetailIdr: inputLayerDetail.maLayer.maDetailIdr,
                                    maDetailShare: inputLayerDetail.maLayer.maDetailShare,
                                },
                            }
                            : undefined,
                        avLayer: inputLayerDetail.avLayer
                            ? {
                                create: {
                                    avDetailUsd: inputLayerDetail.avLayer.avDetailUsd,
                                    avDetailIdr: inputLayerDetail.avLayer.avDetailIdr,
                                    avDetailShare: inputLayerDetail.avLayer.avDetailShare,
                                },
                            }
                            : undefined,
                        liabilityLayer: inputLayerDetail.liabilityLayer
                            ? {
                                create: {
                                    liabilityDetailUsd: inputLayerDetail.liabilityLayer.liabilityDetailUsd,
                                    liabilityDetailIdr: inputLayerDetail.liabilityLayer.liabilityDetailIdr,
                                    liabilityDetailShare: inputLayerDetail.liabilityLayer.liabilityDetailShare,
                                },
                            }
                            : undefined,
                    },
                });
            }

            if (inputPremiumDetail) {
                const premiumDetail = await prisma.premiumDetail.create({
                    data: {
                        calculatorId: calculator.id,
                        pdmaPremium: inputPremiumDetail.pdmaPremium
                            ? {
                                create: {
                                    pdmaPremiumUsd: inputPremiumDetail.pdmaPremium.pdmaPremiumUsd,
                                    pdmaPremiumIdr: inputPremiumDetail.pdmaPremium.pdmaPremiumIdr,
                                    pdmaPremiumShare: inputPremiumDetail.pdmaPremium.pdmaPremiumShare,
                                },
                            }
                            : undefined,
                        maPremium: inputPremiumDetail.maPremium
                            ? {
                                create: {
                                    maPremiumUsd: inputPremiumDetail.maPremium.maPremiumUsd,
                                    maPremiumIdr: inputPremiumDetail.maPremium.maPremiumIdr,
                                    maPremiumShare: inputPremiumDetail.maPremium.maPremiumShare,
                                },
                            }
                            : undefined,
                        avPremium: inputPremiumDetail.avPremium
                            ? {
                                create: {
                                    avPremiumUsd: inputPremiumDetail.avPremium.avPremiumUsd,
                                    avPremiumIdr: inputPremiumDetail.avPremium.avPremiumIdr,
                                    avPremiumShare: inputPremiumDetail.avPremium.avPremiumShare,
                                },
                            }
                            : undefined,
                        liabilityPremium: inputPremiumDetail.liabilityPremium
                            ? {
                                create: {
                                    liabilityPremiumUsd: inputPremiumDetail.liabilityPremium.liabilityPremiumUsd,
                                    liabilityPremiumIdr: inputPremiumDetail.liabilityPremium.liabilityPremiumIdr,
                                    liabilityPremiumShare: inputPremiumDetail.liabilityPremium.liabilityPremiumShare,
                                },
                            }
                            : undefined,
                    },
                });
            }

            if (inputShareDetail) {
                const shareDetail = await prisma.shareDetail.create({
                    data: {
                        calculatorId: calculator.id,
                        pdmaShare: inputShareDetail.pdmaShare
                            ? {
                                create: {
                                    pdmaShareUsd: inputShareDetail.pdmaShare.pdmaShareUsd,
                                    pdmaShareIdr: inputShareDetail.pdmaShare.pdmaShareIdr,
                                    pdmaSharePremiumUsd: inputShareDetail.pdmaShare.pdmaSharePremiumUsd,
                                    pdmaSharePremiumIdr: inputShareDetail.pdmaShare.pdmaSharePremiumIdr,
                                },
                            }
                            : undefined,
                        maShare: inputShareDetail.maShare
                            ? {
                                create: {
                                    maShareUsd: inputShareDetail.maShare.maShareUsd,
                                    maShareIdr: inputShareDetail.maShare.maShareIdr,
                                    maSharePremiumUsd: inputShareDetail.maShare.maSharePremiumUsd,
                                    maSharePremiumIdr: inputShareDetail.maShare.maSharePremiumIdr,
                                },
                            }
                            : undefined,
                        avShare: inputShareDetail.avShare
                            ? {
                                create: {
                                    avShareUsd: inputShareDetail.avShare.avShareUsd,
                                    avShareIdr: inputShareDetail.avShare.avShareIdr,
                                    avSharePremiumUsd: inputShareDetail.avShare.avSharePremiumUsd,
                                    avSharePremiumIdr: inputShareDetail.avShare.avSharePremiumIdr,
                                },
                            }
                            : undefined,
                        liabilityShare: inputShareDetail.liabilityShare
                            ? {
                                create: {
                                    liabilityShareUsd: inputShareDetail.liabilityShare.liabilityShareUsd,
                                    liabilityShareIdr: inputShareDetail.liabilityShare.liabilityShareIdr,
                                    liabilitySharePremiumUsd: inputShareDetail.liabilityShare.liabilitySharePremiumUsd,
                                    liabilitySharePremiumIdr: inputShareDetail.liabilityShare.liabilitySharePremiumIdr,
                                },
                            }
                            : undefined,
                    },
                });
            }

            return calculator;
        });

        res.status(201).json(result);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                error: "Validation error",
                details: err.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            });
        }
        console.error("Error creating calculator:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateCalculator = async (req, res) => {
    try {
        const { id } = req.params;
        const { inputStatementDate, inputOpeningfund, inputStatementPeriod, inputTreatyYear, inputTreatyDetail, inputLayerDetail, inputPremium, inputShare } = req.body;

        const existingCalculator = await prisma.calculator.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingCalculator) {
            return res.status(404).json({ error: 'Calculator not found' });
        }

        const dataToUpdate = {};
        if (inputStatementDate) dataToUpdate.inputStatementDate = new Date(inputStatementDate);
        if (inputOpeningfund) dataToUpdate.inputOpeningfund = inputOpeningfund;
        if (inputStatementPeriod) dataToUpdate.inputStatementPeriod = new Date(inputStatementPeriod);
        if (inputTreatyYear) dataToUpdate.inputTreatyYear = inputTreatyYear;
        if (inputTreatyDetail) dataToUpdate.inputTreatyDetail = JSON.stringify(inputTreatyDetail);
        if (inputLayerDetail) dataToUpdate.inputLayerDetail = JSON.stringify(inputLayerDetail);
        if (inputPremium) dataToUpdate.inputPremium = JSON.stringify(inputPremium);
        if (inputShare) dataToUpdate.inputShare = JSON.stringify(inputShare);

        const updatedCalculator = await prisma.calculator.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
        });

        res.status(200).json(updatedCalculator);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Calculator not found' });
        }
        console.error("Error updating calculator:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteCalculator = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCalculator = await prisma.calculator.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingCalculator) {
            return res.status(404).json({ error: 'Calculator not found' });
        }

        await prisma.calculator.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Calculator deleted successfully' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Calculator not found' });
        }
        console.error("Error deleting calculator:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};