import * as Yup from 'yup';

const amountSchema = Yup.object({
    usd: Yup.number().typeError("Harus berupa angka").nullable(),
    idr: Yup.number().typeError("Harus berupa angka").nullable(),
    share: Yup.number().typeError("Harus berupa angka").nullable(),
});

export const validationSchema = Yup.object({
    inputStatementDate: Yup.string()
        .nullable()
        .required("Tanggal statement wajib diisi")
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Format tanggal harus MM/DD/YYYY")
        .test("valid-date", "Tanggal tidak valid", value => {
            if (!value) return false;
            const dateParts = value.split('/');
            const month = parseInt(dateParts[0], 10);
            const day = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[2], 10);
            const date = new Date(year, month - 1, day);
            return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
        }),
    inputOpeningfund: Yup.string().trim().nullable().required("Opening fund wajib diisi"),
    inputStatementPeriod: Yup.string()
        .nullable()
        .required("Tanggal statement wajib diisi")
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Format tanggal harus MM/DD/YYYY")
        .test("valid-date", "Tanggal tidak valid", value => {
            if (!value) return false;
            const dateParts = value.split('/');
            const month = parseInt(dateParts[0], 10);
            const day = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[2], 10);
            const date = new Date(year, month - 1, day);
            return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
        }),
    inputTreatyYear: Yup.number()
        .nullable()
        .required("Tahun treaty wajib diisi")
        .typeError("Tahun treaty harus berupa angka")
        .integer("Tahun treaty harus bilangan bulat")
        .positive("Tahun treaty harus positif"),
    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            Exchange: Yup.number().nullable(),
            Margin: Yup.number().nullable(),
            Brokerage: Yup.number().nullable(),
            Interest: Yup.number().nullable(),
            LAP: Yup.number().nullable(),
            Maintenance: Yup.number().nullable(),
        }).nullable(),
        treatyPriorYear: Yup.object({
            Exchange: Yup.number().nullable(),
            Margin: Yup.number().nullable(),
            Brokerage: Yup.number().nullable(),
            Interest: Yup.number().nullable(),
            LAP: Yup.number().nullable(),
            Maintenance: Yup.number().nullable(),
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