/**
 * @description Гарантированно возвращает массив элементов.
 * @param {any | any[]} item Принимает либо массив элементов, либо один элемент.
 * @returns {any[]} Возвращает всегда массив. Если был получен массив, то вернет его.
 * Если был получен один элемент, то вернет его, обернутым в массив.
 */
export const castToArray = <T>(item: T | T[]): T[] => (Array.isArray(item) ? item : [item]);

export default castToArray;
