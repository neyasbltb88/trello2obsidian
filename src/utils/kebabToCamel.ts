/**
 * @description Заменяет стиль написания строки с kebab-case на camelCase.
 * @param {string} string Исходная строка в kebab-case.
 * @returns {string} Итоговая строка в camelCase.
 */
export const kebabToCamel = (string: string): string => string.replace(/-./g, (x: string) => x.toUpperCase()[1]);

export default kebabToCamel;
