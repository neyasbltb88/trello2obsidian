/**
 * @description Имитирует поведение .forEach на массиве, только перебирает ключи в объекте и
 * вызывает коллбек для каждого.
 * @param {object} object Итерируемый объект.
 * @param {Function} cb Коллбек, который вызывается на каждом свойстве из итерируемого объекта.
 */
export const objectForEach = <T>(object: T, cb: (element: T[keyof T], key: keyof T, object: T) => void) => {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key];

            cb(element, key, object);
        }
    }
};

export default objectForEach;
