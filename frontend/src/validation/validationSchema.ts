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
  .nullable()
  .required("Tanggal statement wajib diisi")
  .matches(/^\d{2}-\d{2}-\d{4}$/, "Format tanggal harus DD-MM-YYYY")
  .test("valid-date", "Tanggal tidak valid", value => {
   if (!value) return false; // Handle null or undefined value
   if (value === "") return true; // Allow empty value for optional fields, if needed, adjust required rule accordingly
   const dateParts = value.split('-');
   if (dateParts.length !== 3) return false; // Check if it has 3 parts
   const day = parseInt(dateParts[0], 10);
   const month = parseInt(dateParts[1], 10);
   const year = parseInt(dateParts[2], 10);
   const date = new Date(year, month - 1, day); // Month is 0-indexed
   return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  }),
 inputOpeningfund: Yup.string().trim().nullable().required("Opening fund wajib diisi"),
 inputStatementPeriod: Yup.string()
  .nullable()
  .required("Tanggal statement wajib diisi")
  .matches(/^\d{2}-\d{2}-\d{4}$/, "Format tanggal harus DD-MM-YYYY")
  .test("valid-date", "Tanggal tidak valid", value => {
   if (!value) return false; // Handle null or undefined value
   if (value === "") return true; // Allow empty value for optional fields, if needed, adjust required rule accordingly
   const dateParts = value.split('-');
   if (dateParts.length !== 3) return false; // Check if it has 3 parts
   const day = parseInt(dateParts[0], 10);
   const month = parseInt(dateParts[1], 10);
   const year = parseInt(dateParts[2], 10);
   const date = new Date(year, month - 1, day); // Month is 0-indexed
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