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
                    create: {
                        treatyCurrentYear: {
                            create: {
                                ...inputTreatyDetail.treatyCurrentYear,
                                currentMaintenance: parseFloat(inputTreatyDetail.treatyCurrentYear.currentMaintenance), // Ensure correct type
                            },
                        },
                        treatyPriorYear: {
                            create: {
                                ...inputTreatyDetail.treatyPriorYear,
                                priorMaintenance: parseFloat(inputTreatyDetail.treatyPriorYear.priorMaintenance), // Ensure correct type
                            },
                        },
                        version: inputTreatyDetail.version,
                    },
                },
                inputLayerDetail: {
                    create: {
                        pdmaLayer: {
                            create: inputLayerDetail.layerPdma,
                        },
                        maLayer: {
                            create: inputLayerDetail.layerMa,
                        },
                        avLayer: {
                            create: inputLayerDetail.layerAv,
                        },
                        liabilityLayer: {
                            create: inputLayerDetail.layerLiability,
                        },
                    },
                },
                inputPremiumDetail: {
                    create: {
                        pdmaPremium: {
                            create: inputPremium.premiumPdma,
                        },
                        maPremium: {
                            create: inputPremium.premiumMa,
                        },
                        avPremium: {
                            create: inputPremium.premiumAv,
                        },
                        liabilityPremium: {
                            create: inputPremium.premiumLiability,
                        },
                    },
                },
                inputShareDetail: {
                    create: {
                        pdmaShare: {
                            create: inputShare.sharePdma,
                        },
                        maShare: {
                            create: inputShare.shareMa,
                        },
                        avShare: {
                            create: inputShare.shareAv,
                        },
                        liabilityShare: {
                            create: inputShare.shareLiability,
                        },
                    },
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
                    update: {
                        treatyCurrentYear: {
                            update: {
                                ...inputTreatyDetail.treatyCurrentYear,
                                currentMaintenance: parseFloat(inputTreatyDetail.treatyCurrentYear.currentMaintenance), // Ensure correct type
                            },
                        },
                        treatyPriorYear: {
                            update: {
                                ...inputTreatyDetail.treatyPriorYear,
                                priorMaintenance: parseFloat(inputTreatyDetail.treatyPriorYear.priorMaintenance), // Ensure correct type
                            },
                        },
                        version: inputTreatyDetail.version,
                    },
                },
                inputLayerDetail: {
                    update: {
                        ...inputLayerDetail,
                        pdmaLayerShare: parseFloat(inputLayerDetail.pdmaLayerShare), // Ensure correct type
                        maLayerShare: parseFloat(inputLayerDetail.maLayerShare), // Ensure correct type
                        avLayerShare: parseFloat(inputLayerDetail.avLayerShare), // Ensure correct type
                        liabilityLayerShare: parseFloat(inputLayerDetail.liabilityLayerShare), // Ensure correct type
                    },
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