import * as Yup from 'yup';

// Validasi untuk amount (USD, IDR, Share)
const amountSchema = Yup.object({
    usd: Yup.number().typeError("Harus berupa angka").nullable(),
    idr: Yup.number().typeError("Harus berupa angka").nullable(),
    share: Yup.number().typeError("Harus berupa angka").nullable(),
});

// Schema validasi utama
export const validationSchema = Yup.object({
    inputStatementDate: Yup.string()
        .required("Tanggal statement wajib diisi")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD")
        .test("valid-date", "Tanggal tidak valid", value => !isNaN(Date.parse(value))),
    inputOpeningfund: Yup.string().trim().required("Opening fund wajib diisi"),
    inputStatementPeriode: Yup.string()
        .required("Tanggal statement wajib diisi")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD")
        .test("valid-date", "Tanggal tidak valid", value => !isNaN(Date.parse(value))),
    inputTreatyYear: Yup.number()
        .required("Tahun treaty wajib diisi")
        .typeError("Tahun treaty harus berupa angka")
        .integer("Tahun treaty harus bilangan bulat")
        .positive("Tahun treaty harus positif"),
    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            Exchange: amountSchema.nullable(),
            Margin: amountSchema.nullable(),
            Brokerage: amountSchema.nullable(),
            Interest: amountSchema.nullable(),
            LAP: amountSchema.nullable(),
            Maintenance: amountSchema.nullable(),
        }).nullable(),
        treatyPriorYear: Yup.object({
            Exchange: amountSchema.nullable(),
            Margin: amountSchema.nullable(),
            Brokerage: amountSchema.nullable(),
            Interest: amountSchema.nullable(),
            LAP: amountSchema.nullable(),
            Maintenance: amountSchema.nullable(),
        }).nullable(),
    }).nullable(),
    inputLayerDetail: Yup.object({
        layerPdma: amountSchema.nullable(),
        layerMa: amountSchema.nullable(),
        layerAv: amountSchema.nullable(),
        layerLiability: amountSchema.nullable(),
    }).nullable(),
    inputPremium: Yup.object({
        premiumPdma: amountSchema.nullable(),
        premiumMa: amountSchema.nullable(),
        premiumAv: amountSchema.nullable(),
        premiumLiability: amountSchema.nullable(),
    }).nullable(),
    inputShare: Yup.object({
        sharePdma: amountSchema.nullable(),
        shareMa: amountSchema.nullable(),
        shareAv: amountSchema.nullable(),
        shareLiability: amountSchema.nullable(),
    }).nullable(),
});
