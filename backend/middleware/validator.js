const { z } = require('zod');

const AmountSchema = z.object({
    usd: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    idr: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
    share: z.preprocess(val => val === "" ? null : Number(val), z.number().nullable()),
});

const TreatyYearSchema = z.object({
    id: z.number().optional(),
    Exchange: AmountSchema.nullable(),
    Margin: AmountSchema.nullable(),
    Brokerage: AmountSchema.nullable(),
    Interest: AmountSchema.nullable(),
    LAP: AmountSchema.nullable(),
    Maintenance: AmountSchema.nullable(),
});

const TreatyDetailSchema = z.object({
    id: z.number().optional(),
    treatyCurrentYear: TreatyYearSchema.nullable(),
    treatyPriorYear: TreatyYearSchema.nullable(),
});

const LayerSchema = z.object({
    id: z.number().optional(),
    layerPdma: AmountSchema.nullable(),
    layerMa: AmountSchema.nullable(),
    layerAv: AmountSchema.nullable(),
    layerLiability: AmountSchema.nullable(),
});

const PremiumSchema = z.object({
    id: z.number().optional(),
    premiumPdma: AmountSchema.nullable(),
    premiumMa: AmountSchema.nullable(),
    premiumAv: AmountSchema.nullable(),
    premiumLiability: AmountSchema.nullable(),
});

const ShareSchema = z.object({
    id: z.number().optional(),
    sharePdma: AmountSchema.nullable(),
    shareMa: AmountSchema.nullable(),
    shareAv: AmountSchema.nullable(),
    shareLiability: AmountSchema.nullable(),
});

const CalculatorSchema = z.object({
    inputStatementDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD")
        .refine(val => !isNaN(Date.parse(val)), { message: "Tanggal tidak valid" }),
    inputOpeningfund: z.string().min(1, "Opening fund wajib diisi"),
    inputStatementPeriode: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD")
        .refine(val => !isNaN(Date.parse(val)), { message: "Tanggal tidak valid" }),
    inputTreatyYear: z.number().int().min(0, "Tahun treaty harus positif"),
    inputTreatyDetail: TreatyDetailSchema.nullable(),
    inputLayerDetail: LayerSchema.nullable(),
    inputPremium: PremiumSchema.nullable(),
    inputShare: ShareSchema.nullable(),
});

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);  // Parsing request body with Zod schema
        next();  // Pass to the next middleware if validation passes
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
    CalculatorSchema,
    ShareSchema,
    PremiumSchema,
    LayerSchema,
    TreatyDetailSchema,
    TreatyYearSchema,
    AmountSchema,
    validate,
};
