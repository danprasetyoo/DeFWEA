const { z } = require('zod');

const TreatyYearSchema = z.object({
    id: z.number().optional(), // Add ID for updates
    Exchange: z.number().nullable().transform(val => val === null ? undefined : val),
    Margin: z.number().nullable().transform(val => val === null ? undefined : val),
    Brokerage: z.number().nullable().transform(val => val === null ? undefined : val),
    Interest: z.number().nullable().transform(val => val === null ? undefined : val),
    LAP: z.number().nullable().transform(val => val === null ? undefined : val),
    Maintenance: z.number().nullable().transform(val => val === null ? undefined : val),
});

const TreatyDetailSchema = z.object({
    id: z.number().optional(),
    treatyCurrentYear: TreatyYearSchema,
    treatyPriorYear: TreatyYearSchema,
});

const LayerSchema = z.object({
    id: z.number().optional(),
    detailUsd: z.number().nullable().transform(val => val === null ? undefined : val),
    detailIdr: z.number().nullable().transform(val => val === null ? undefined : val),
    detailShare: z.number().nullable().transform(val => val === null ? undefined : val),
});

const LayerDetailSchema = z.object({
    id: z.number().optional(),
    layerPdma: LayerSchema,
    layerMa: LayerSchema,
    layerAv: LayerSchema,
    layerLiability: LayerSchema,
});

const PremiumDetailSchema = z.object({
    id: z.number().optional(),
    premiumUsd: z.number().nullable().transform(val => val === null ? undefined : val),
    premiumIdr: z.number().nullable().transform(val => val === null ? undefined : val),
    premiumShare: z.number().nullable().transform(val => val === null ? undefined : val),
});

const PremiumSchema = z.object({
    id: z.number().optional(),
    premiumPdma: PremiumDetailSchema,
    premiumMa: PremiumDetailSchema,
    premiumAv: PremiumDetailSchema,
    premiumLiability: PremiumDetailSchema,
});


const ShareDetailSchema = z.object({
    id: z.number().optional(),
    shareUsd: z.number().nullable().transform(val => val === null ? undefined : val),
    shareIdr: z.number().nullable().transform(val => val === null ? undefined : val),
    sharePremiumUsd: z.number().nullable().transform(val => val === null ? undefined : val),
    sharePremiumIdr: z.number().nullable().transform(val => val === null ? undefined : val),
});

const ShareSchema = z.object({
    id: z.number().optional(),
    sharePdma: ShareDetailSchema,
    shareMa: ShareDetailSchema,
    shareAv: ShareDetailSchema,
    shareLiability: ShareDetailSchema,
});

const CalculatorSchema = z.object({
    inputStatementDate: z.string().transform(val => {
        const date = new Date(val);
        if (isNaN(date.getTime()) || val !== date.toISOString().split('T')[0]) {
            throw new z.ZodError([{ path: ['inputStatementDate'], message: "Format tanggal harus YYYY-MM-DD" }]);
        }
        return val;
    }),
    inputOpeningfund: z.string(),
    inputStatementPeriod: z.string().transform(val => {
        const date = new Date(val);
        if (isNaN(date.getTime()) || val !== date.toISOString().split('T')[0]) {
            throw new z.ZodError([{ path: ['inputStatementPeriod'], message: "Format tanggal harus YYYY-MM-DD" }]);
        }
        return val;
    }),
    inputTreatyYear: z.number().transform(Number),
    inputTreatyDetail: TreatyDetailSchema.nullable(),
    inputLayerDetail: LayerDetailSchema.nullable(),
    inputPremium: PremiumSchema.nullable(),
    inputShare: ShareSchema.nullable(),
});

module.exports = {
    CalculatorSchema,
    TreatyDetailSchema,
    LayerDetailSchema,
    PremiumSchema,
    ShareSchema,
    TreatyYearSchema,
    LayerSchema,
    PremiumDetailSchema,
    ShareDetailSchema,
};