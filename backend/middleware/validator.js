const { z } = require('zod');

const CalculatorSchema = z.object({
  inputStatementDate: z
    .string()
    .nullable()
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, { message: 'Tanggal tidak valid' })
    .refine((val) => {
      if (!val) return true;
      return /^\d{2}\/\d{2}\/\d{4}$/.test(val);
    }, { message: 'Format tanggal harus MM/DD/YYYY' }),
  inputOpeningfund: z.string().min(1, 'Opening fund wajib diisi'),
  inputStatementPeriod: z
    .string()
    .nullable()
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, { message: 'Tanggal tidak valid' })
    .refine((val) => {
      if (!val) return true;
      return /^\d{2}\/\d{2}\/\d{4}$/.test(val);
    }, { message: 'Format tanggal harus MM/DD/YYYY' }),
  inputTreatyYear: z.number().int().min(0, 'Tahun treaty harus positif').nullable(),
  version: z.string().optional(),
  treatyYear: z
    .object({
      treatyDetailIdCurrent: z.number().int().nullable(),
      treatyDetailIdPrior: z.number().int().nullable(),
    })
    .nullable()
    .optional(),
  layer: z
    .object({
      layerDetailIdPdma: z.number().int().nullable(),
      layerDetailIdMa: z.number().int().nullable(),
      layerDetailIdAv: z.number().int().nullable(),
      layerDetailIdLiability: z.number().int().nullable(),
    })
    .nullable()
    .optional(),
  premium: z
    .object({
      premiumIdPdma: z.number().int().nullable(),
      premiumIdMa: z.number().int().nullable(),
      premiumIdAv: z.number().int().nullable(),
      premiumIdLiability: z.number().int().nullable(),
    })
    .nullable()
    .optional(),
  share: z
    .object({
      shareIdPdma: z.number().int().nullable(),
      shareIdMa: z.number().int().nullable(),
      shareIdAv: z.number().int().nullable(),
      shareIdLiability: z.number().int().nullable(),
    })
    .nullable()
    .optional(),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation Error',
        details: error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
    } else {
      res.status(400).json({ error: 'Validation failed' });
    }
  }
};

module.exports = {
  validate,
  CalculatorSchema,
};