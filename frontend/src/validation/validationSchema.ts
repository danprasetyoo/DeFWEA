import * as Yup from 'yup';

export const validationSchema = Yup.object({
    inputStatementDate: Yup.string()
        .required("Tanggal statement wajib diisi")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD"),
    inputOpeningfund: Yup.string().required("Opening fund wajib diisi"),
    inputStatementPeriod: Yup.string()
        .required("Periode statement wajib diisi")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD"),
    inputTreatyYear: Yup.number()
        .required("Tahun treaty wajib diisi")
        .typeError("Tahun treaty harus berupa angka"),
    inputTreatyDetail: Yup.object({
        treatyCurrentYear: Yup.object({
            Exchange: Yup.number().typeError("Harus berupa angka").nullable(),
            Margin: Yup.number().typeError("Harus berupa angka").nullable(),
            Brokerage: Yup.number().typeError("Harus berupa angka").nullable(),
            Interest: Yup.number().typeError("Harus berupa angka").nullable(),
            LAP: Yup.number().typeError("Harus berupa angka").nullable(),
            Maintenance: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        treatyPriorYear: Yup.object({
            Exchange: Yup.number().typeError("Harus berupa angka").nullable(),
            Margin: Yup.number().typeError("Harus berupa angka").nullable(),
            Brokerage: Yup.number().typeError("Harus berupa angka").nullable(),
            Interest: Yup.number().typeError("Harus berupa angka").nullable(),
            LAP: Yup.number().typeError("Harus berupa angka").nullable(),
            Maintenance: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
    }).nullable(),

    inputLayerDetail: Yup.object({
        layerPdma: Yup.object({
            detailUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            detailIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            detailShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        layerMa: Yup.object({
            detailUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            detailIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            detailShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        layerAv: Yup.object({
            detailUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            detailIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            detailShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        layerLiability: Yup.object({
            detailUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            detailIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            detailShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
    }).nullable(),

    inputPremium: Yup.object({
        premiumPdma: Yup.object({
            premiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        premiumMa: Yup.object({
            premiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        premiumAv: Yup.object({
            premiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        premiumLiability: Yup.object({
            premiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            premiumShare: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
    }).nullable(),

    inputShare: Yup.object({
        sharePdma: Yup.object({
            shareUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            shareIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        shareMa: Yup.object({
            shareUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            shareIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        shareAv: Yup.object({
            shareUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            shareIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
        shareLiability: Yup.object({
            shareUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            shareIdr: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumUsd: Yup.number().typeError("Harus berupa angka").nullable(),
            sharePremiumIdr: Yup.number().typeError("Harus berupa angka").nullable(),
        }).nullable(),
    }).nullable(),
});