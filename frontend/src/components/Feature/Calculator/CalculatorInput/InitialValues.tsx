import * as Yup from "yup";

export interface CalculatorPayload {
    inputStatementDate?: string;
    inputOpeningfund?: string;
    inputStatementPeriod?: string;
    inputTreatyYear?: number;
    inputTreatyDetail?: {
        treatyCurrentYear?: AmountDetail;
        treatyPriorYear?: AmountDetail;
    };
    inputLayerDetail?: {
        layerPdma?: LayerAmountDetail;
        layerMa?: LayerAmountDetail;
        layerAv?: LayerAmountDetail;
        layerLiability?: LayerAmountDetail;
    };
    inputPremium?: {
        premiumPdma?: LayerAmountDetail;
        premiumMa?: LayerAmountDetail;
        premiumAv?: LayerAmountDetail;
        premiumLiability?: LayerAmountDetail;
    };
    inputShare?: {
        sharePdma?: ShareDetail;
        shareMa?: ShareDetail;
        shareAv?: ShareDetail;
        shareLiability?: ShareDetail;
    };
}

interface AmountDetail {
    Exchange?: number | undefined;
    Margin?: number | undefined;
    Brokerage?: number | undefined;
    Interest?: number | undefined;
    LAP?: number | undefined;
    Maintenance?: number | undefined;
}

interface LayerAmountDetail {
    detailUsd?: number | undefined;
    detailIdr?: number | undefined;
    detailShare?: number | undefined;
}

interface ShareDetail {
    shareUsd?: number | undefined;
    shareIdr?: number | undefined;
    sharePremiumUsd?: number | undefined;
    sharePremiumIdr?: number | undefined;
}

// Amount Detail Schema
const amountDetailSchema = Yup.object().shape({
    Exchange: Yup.number().nullable(),
    Margin: Yup.number().nullable(),
    Brokerage: Yup.number().nullable(),
    Interest: Yup.number().nullable(),
    LAP: Yup.number().nullable(),
    Maintenance: Yup.number().nullable(),
});

// Layer Amount Detail Schema
const layerAmountDetailSchema = Yup.object().shape({
    detailUsd: Yup.number().nullable(),
    detailIdr: Yup.number().nullable(),
    detailShare: Yup.number().nullable(),
});

// Share Detail Schema
const shareDetailSchema = Yup.object().shape({
    shareUsd: Yup.number().nullable(),
    shareIdr: Yup.number().nullable(),
    sharePremiumUsd: Yup.number().nullable(),
    sharePremiumIdr: Yup.number().nullable(),
});

// Main Validation Schema
export const validationSchema = Yup.object().shape({
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
    inputTreatyDetail: Yup.object().shape({
        treatyCurrentYear: amountDetailSchema.nullable(),
        treatyPriorYear: amountDetailSchema.nullable(),
    }).nullable(),
    inputLayerDetail: Yup.object().shape({
        layerPdma: layerAmountDetailSchema.nullable(),
        layerMa: layerAmountDetailSchema.nullable(),
        layerAv: layerAmountDetailSchema.nullable(),
        layerLiability: layerAmountDetailSchema.nullable(),
    }).nullable(),
    inputPremium: Yup.object().shape({
        premiumPdma: layerAmountDetailSchema.nullable(),
        premiumMa: layerAmountDetailSchema.nullable(),
        premiumAv: layerAmountDetailSchema.nullable(),
        premiumLiability: layerAmountDetailSchema.nullable(),
    }).nullable(),
    inputShare: Yup.object().shape({
        sharePdma: shareDetailSchema.nullable(),
        shareMa: shareDetailSchema.nullable(),
        shareAv: shareDetailSchema.nullable(),
        shareLiability: shareDetailSchema.nullable(),
    }).nullable(),
});

// initialValues (Corrected to match the schema and interfaces)
const initialValues: CalculatorPayload = {
    inputStatementDate: "",
    inputOpeningfund: "",
    inputStatementPeriod: "",
    inputTreatyYear: undefined,
    inputTreatyDetail: {
        treatyCurrentYear: {
            Exchange: undefined,
            Margin: undefined,
            Brokerage: undefined,
            Interest: undefined,
            LAP: undefined,
            Maintenance: undefined,
        },
        treatyPriorYear: {
            Exchange: undefined,
            Margin: undefined,
            Brokerage: undefined,
            Interest: undefined,
            LAP: undefined,
            Maintenance: undefined,
        },
    },
    inputLayerDetail: {
        layerPdma: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        layerMa: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        layerAv: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        layerLiability: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
    },
    inputPremium: {
        premiumPdma: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        premiumMa: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        premiumAv: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
        premiumLiability: { detailUsd: undefined, detailIdr: undefined, detailShare: undefined },
    },
    inputShare: {
        sharePdma: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
        shareMa: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
        shareAv: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
        shareLiability: { shareUsd: undefined, shareIdr: undefined, sharePremiumUsd: undefined, sharePremiumIdr: undefined },
    },
};

export default initialValues;