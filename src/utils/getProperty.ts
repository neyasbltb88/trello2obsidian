import Key from '@models/Key';

import getNestedObjectProperty from '@utils/getNestedObjectProperty';

/**
 * @description Позволяет безопасно получать из объекта/массива значение свойства, указанного в propName.
 * Можно получать значения вложенных свойств, передавая путь к ним в propName через разделитель delimiter.
 * Если не передано имя свойства в propName, то вернется сам item.
 *
 * @param {any} item Объект/Массив, из которого нужно получить значение определенного свойства.
 * Если item не является объектом, то вернется он сам.
 * @param {string} [propName] Строка, описывающая имя свойства или путь вглубь объекта.
 * @param {string} [delimiter='.'] Разделитель для пути в строке propName.
 * @returns Возвращает полученное из объекта значение свойства.
 *
 * @example
 * // Пример с объектом
 * let obj = { test: { nested1: 1, nested2: { nested3: 3 } }, test2: 4 };
 * getProperty(obj, 'test.nested2.nested3'); // 3
 * getProperty(obj, 'test_nested2_nested3', '_'); // 3
 * getProperty(obj); // Вернется сам объект obj
 *
 * // Пример с массивом
 * let arr = [1, 2, 3, { nestedObj: 4 }];
 * getProperty(arr, '1'); // 2
 * getProperty(arr, '3.nestedObj'); // 4
 * getProperty(arr); // Вернется сам массив arr
 *
 * // Пример с примитивом
 * let num = 5;
 * getProperty(num /* Здесь уже не важно наличие propName *\/); // 5 - Вернется само значение num
 */
export const getProperty = <T>(item: any, propName?: Key, delimiter: string = '.'): T => {
    return propName === undefined || item === null || typeof item !== 'object'
        ? item
        : getNestedObjectProperty(item, propName, delimiter);
};

export default getProperty;
