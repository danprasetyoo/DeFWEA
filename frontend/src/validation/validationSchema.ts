import * as Yup from 'yup';

export const validationSchema = Yup.object({
  inputStatementDate: Yup.string()
    .nullable()
    .required('Tanggal statement wajib diisi')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Format tanggal harus MM/DD/YYYY')
    .test('valid-date', 'Tanggal tidak valid', (value) => {
      if (!value) return false;
      const dateParts = value.split('/');
      const month = parseInt(dateParts[0], 10);
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);
      const date = new Date(year, month - 1, day);
      return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
      );
    }),
  inputOpeningfund: Yup.string()
    .trim()
    .nullable()
    .required('Opening fund wajib diisi'),
  inputStatementPeriod: Yup.string()
    .nullable()
    .required('Tanggal statement wajib diisi')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Format tanggal harus MM/DD/YYYY')
    .test('valid-date', 'Tanggal tidak valid', (value) => {
      if (!value) return false;
      const dateParts = value.split('/');
      const month = parseInt(dateParts[0], 10);
      const day = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);
      const date = new Date(year, month - 1, day);
      return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
      );
    }),
  inputTreatyYear: Yup.number()
    .nullable()
    .required('Tahun treaty wajib diisi')
    .typeError('Tahun treaty harus berupa angka')
    .integer('Tahun treaty harus bilangan bulat')
    .positive('Tahun treaty harus positif'),
  version: Yup.string().optional(),
  treatyYear: Yup.object({
    treatyDetailIdCurrent: Yup.number().integer().nullable(),
    treatyDetailIdPrior: Yup.number().integer().nullable(),
  })
    .nullable()
    .optional(),
  layer: Yup.object({
    layerDetailIdPdma: Yup.number().integer().nullable(),
    layerDetailIdMa: Yup.number().integer().nullable(),
    layerDetailIdAv: Yup.number().integer().nullable(),
    layerDetailIdLiability: Yup.number().integer().nullable(),
  })
    .nullable()
    .optional(),
  premium: Yup.object({
    premiumIdPdma: Yup.number().integer().nullable(),
    premiumIdMa: Yup.number().integer().nullable(),
    premiumIdAv: Yup.number().integer().nullable(),
    premiumIdLiability: Yup.number().integer().nullable(),
  })
    .nullable()
    .optional(),
  share: Yup.object({
    shareIdPdma: Yup.number().integer().nullable(),
    shareIdMa: Yup.number().integer().nullable(),
    shareIdAv: Yup.number().integer().nullable(),
    shareIdLiability: Yup.number().integer().nullable(),
  })
    .nullable()
    .optional(),
});