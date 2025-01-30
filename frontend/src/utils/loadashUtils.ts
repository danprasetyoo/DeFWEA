import _ from 'lodash';
import InitialValues from '../components/Feature/Calculator/CalculatorInput/InitialValues';

/**
 * Enhanced deepSet utility dengan handling tipe data spesifik
 */
export const deepSet = (object: any, path: string, value: any) => {
  if (!object || typeof object !== "object") {
    throw new Error("First argument must be an object.");
  }

  if (typeof path !== "string" || !path.length) {
    throw new Error("Path must be a non-empty string.");
  }

  // Konversi nilai berdasarkan tipe data di initial values
  const convertedValue = convertValueAccordingToInitialType(object, path, value);
  
  return _.set({ ...object }, path, convertedValue);
};

/**
 * Helper untuk konversi nilai berdasarkan tipe data yang diharapkan
 */
const convertValueAccordingToInitialType = (_obj: any, path: string, value: any) => {
  // Dapatkan contoh nilai dari initial values
  const sampleValue = _.get(InitialValues, path);
  
  // Handle number fields
  if (typeof sampleValue === 'number') {
    // Konversi dari string ke number
    if (typeof value === 'string') {
      // Handle percentage values
      if (value.includes('%')) {
        const numericValue = parseFloat(value.replace('%', ''));
        return isNaN(numericValue) ? 0 : numericValue / 100;
      }
      
      const numericValue = parseFloat(value);
      return isNaN(numericValue) ? 0 : numericValue;
    }
    
    return Number(value) || 0;
  }

  // Handle string fields
  if (typeof sampleValue === 'string') {
    return String(value);
  }

  return value;
};