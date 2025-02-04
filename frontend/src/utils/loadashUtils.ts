import _ from 'lodash';
import InitialValues from '../components/Feature/Calculator/CalculatorInput/InitialValues';

export const deepSet = (object: any, path: string, value: any) => {
    if (!object || typeof object !== "object") {
        throw new Error("First argument must be an object.");
    }

    if (typeof path !== "string" || !path.length) {
        throw new Error("Path must be a non-empty string.");
    }

    const convertedValue = convertValueAccordingToInitialType(object, path, value);

    return _.set({ ...object }, path, convertedValue);
};

const convertValueAccordingToInitialType = (_obj: any, path: string, value: any) => {
    const sampleValue = _.get(InitialValues, path, null); // Default null

    if (sampleValue === null || sampleValue === undefined) {
        return value; // Handle cases where the path is not in InitialValues
    }

    if (typeof sampleValue === 'number') {
        if (typeof value === 'string') {
            if (value.includes('%')) {
                const numericValue = parseFloat(value.replace(/[^0-9.-]/g, '')); // More robust percentage conversion
                return isNaN(numericValue) ? 0 : numericValue / 100;
            }

            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? 0 : numericValue;
        }

        return Number(value) || 0;
    }

    if (typeof sampleValue === 'string') {
        return String(value);
    }

    if (typeof sampleValue === 'boolean') { // Handle boolean types
        return !!value;
    }

    return value;
};