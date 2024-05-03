import { extend } from 'quasar';

/**
 * @description Возвращает клонированный массив или объект. Обертка для квазаровской утилиты extend.
 * @param {T} value Массив или объект.
 * @returns {T} Возвращает глубокую копию переданного аргумента.
 * @see https://v1.quasar.dev/quasar-utils/other-utils#-deep-copy-objects
 */
export const cloneDeep = <T>(value: T): T => {
    let target = Array.isArray(value) ? [] : {};

    return extend<T>(true, target, value);
};

export default cloneDeep;
