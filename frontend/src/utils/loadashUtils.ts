import _ from 'lodash';

export const deepSet = (object: any, path: string, value: any) => {
    return _.set(object, path, value);
};
