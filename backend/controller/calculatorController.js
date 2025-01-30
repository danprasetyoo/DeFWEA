// calculatorController.js
const { PrismaClient } = require('@prisma/client');
const { CalculatorSchema } = require('../middleware/validator');
const { z } = require('zod');

const prisma = new PrismaClient();

const deepMerge = (target, source) => {
    if (typeof target !== 'object' || typeof source !== 'object') return source;
    for (const key in source) {
        if (source[key] instanceof Date) {
            target[key] = source[key];
        } else if (source[key] instanceof Object) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
};

const parseDates = (data) => ({
    ...data,
    inputStatementDate: new Date(data.inputStatementDate),
    inputStatementPeriod: new Date(data.inputStatementPeriod),
});

const handleError = (res, error, defaultMessage) => {
    console.error(error);

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

    res.status(500).json({ error: defaultMessage });
};

const createCalculator = async (req, res) => {
    try {
        const validatedData = CalculatorSchema.parse(req.body);

        const result = await handleDatabaseOperation(() =>
            prisma.calculator.create({
                data: {
                    ...validatedData,
                    version: 1
                },
                select: {
                    id: true,
                    inputStatementDate: true,
                    version: true,
                    createdAt: true
                }
            })
        );

        res.status(201).json({
            status: 'success',
            data: result,
            metadata: {
                generatedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        handleError(res, error, 'Failed to create calculator');
    }
};

const getAllCalculators = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const calculators = await prisma.calculator.findMany({
            skip: (page - 1) * limit,
            take: Number(limit),
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(calculators);
    } catch (err) {
        handleError(res, err, 'Failed to fetch calculators');
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
        });

        if (!calculator) {
            return res.status(404).json({ error: 'Calculator not found' });
        }

        res.status(200).json(calculator);
    } catch (err) {
        handleError(res, err, 'Failed to fetch calculator');
    }
};

const updateCalculator = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = CalculatorSchema.partial().parse(req.body);

        const existingRecord = await handleDatabaseOperation(() =>
            prisma.calculator.findUnique({ where: { id: Number(id) } })
        );

        if (!existingRecord) {
            return res.status(404).json({
                error: 'NOT_FOUND',
                message: 'Calculator record not found'
            });
        }

        const mergedData = deepMerge(existingRecord, validatedData);

        const updatedRecord = await handleDatabaseOperation(() =>
            prisma.calculator.update({
                where: { id: Number(id) },
                data: {
                    ...mergedData,
                    version: { increment: 1 }
                },
                select: {
                    id: true,
                    version: true,
                    updatedAt: true
                }
            })
        );

        res.status(200).json({
            status: 'success',
            data: updatedRecord,
            changes: Object.keys(validatedData)
        });
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

        res.status(200).json({ message: 'Calculator deleted successfully' });
    } catch (err) {
        handleError(res, err, 'Failed to delete calculator');
    }
};

module.exports = {
    createCalculator,
    getAllCalculators,
    getCalculatorById,
    updateCalculator,
    deleteCalculator
};