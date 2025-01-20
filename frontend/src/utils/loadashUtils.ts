import _ from 'lodash';

/**
 * A utility function to deeply set a value in an object based on a given path.
 *
 * @param {object} object 
 * @param {string} path 
 * @param {any} value 
 * @returns {object} 
 */
export const deepSet = (object: any, path: string, value: any) => {
    if (!object || typeof object !== "object") {
        throw new Error("First argument must be an object.");
    }

    if (typeof path !== "string" || !path.length) {
        throw new Error("Path must be a non-empty string.");
    }

    return _.set(object, path, value);
};
