const { z } = require('zod');

const AmountSchema = z.object({
    usd: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    idr: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    share: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
});

const TreatyYearSchema = z.object({
    Exchange: z.number().nullable(),
    Margin: z.number().nullable(),
    Brokerage: z.number().nullable(),
    Interest: z.number().nullable(),
    LAP: z.number().nullable(),
    Maintenance: z.number().nullable(),
});

const TreatyDetailSchema = z.object({
    treatyCurrentYear: TreatyYearSchema.nullable(),
    treatyPriorYear: TreatyYearSchema.nullable(),
});

const LayerAmountDetailSchema = z.object({
    detailUsd: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    detailIdr: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    detailShare: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
});

const LayerSchema = z.object({
    layerPdma: LayerAmountDetailSchema.nullable(),
    layerMa: LayerAmountDetailSchema.nullable(),
    layerAv: LayerAmountDetailSchema.nullable(),
    layerLiability: LayerAmountDetailSchema.nullable(),
});

const ShareDetailSchema = z.object({
    shareUsd: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    shareIdr: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    sharePremiumUsd: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    sharePremiumIdr: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
});

const ShareSchema = z.object({
    sharePdma: ShareDetailSchema.nullable(),
    shareMa: ShareDetailSchema.nullable(),
    shareAv: ShareDetailSchema.nullable(),
    shareLiability: ShareDetailSchema.nullable(),
});

const PremiumDetailSchema = z.object({
    premiumUsd: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    premiumIdr: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    premiumShare: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
});

const PremiumSchema = z.object({
    premiumPdma: PremiumDetailSchema.nullable(),
    premiumMa: PremiumDetailSchema.nullable(),
    premiumAv: PremiumDetailSchema.nullable(),
    premiumLiability: PremiumDetailSchema.nullable(),
});

const CalculatorSchema = z.object({
    inputStatementDate: z.string()
        .nullable()
        .refine(val => {
            if (!val) return true;
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, { message: "Tanggal tidak valid" })
        .refine(val => {
            if (!val) return true;
            return /^\d{2}\/\d{2}\/\d{4}$/.test(val)
        }, { message: "Format tanggal harus MM/DD/YYYY" }),
    inputOpeningfund: z.string().min(1, "Opening fund wajib diisi"),
    inputStatementPeriod: z.string()
        .nullable()
        .refine(val => {
            if (!val) return true;
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, { message: "Tanggal tidak valid" })
        .refine(val => {
            if (!val) return true;
            return /^\d{2}\/\d{2}\/\d{4}$/.test(val)
        }, { message: "Format tanggal harus MM/DD/YYYY" }),
    inputTreatyYear: z.number().int().min(0, "Tahun treaty harus positif").nullable(),
    inputTreatyDetail: TreatyDetailSchema.nullable(),
    inputLayerDetail: LayerSchema.nullable(),
    inputPremium: PremiumSchema.nullable(),
    inputShare: ShareSchema.nullable(),
});

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: 'Validation Error',
                details: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            });
        } else {
            res.status(400).json({ error: "Validation failed" });
        }
    }
};

module.exports = {
    ShareSchema,
    PremiumSchema,
    LayerSchema,
    TreatyDetailSchema,
    TreatyYearSchema,
    AmountSchema,
    validate,
    CalculatorSchema,
};