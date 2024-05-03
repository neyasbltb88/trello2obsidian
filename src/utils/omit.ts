import TAnyObject from '@models/TAnyObject';

import { castToArray, cloneDeep } from '@utils';

/**
 * @description Удаляет из объекта object указанные в keys поля
 * @param {TAnyObject} object Объект, из которого нужно удалять поля
 * @param {string | string[]} keys Имя поля или массив имен полей, которые нужно удалить
 * @param {boolean} [newObject=true] Если true, то вернет новый объект без указанных полей.
 * Если false, то указанные поля удалятся прямо в полученным объекте и он же вернется
 * @returns {TAnyObject}
 */
export const omit = <T>(object: TAnyObject, keys: string | string[], newObject: boolean = true): T => {
    keys = castToArray(keys);
    let result = newObject ? cloneDeep(object) : object;
    keys.forEach(key => delete result[key]);

    return <T>(<unknown>result);
};

export default omit;
