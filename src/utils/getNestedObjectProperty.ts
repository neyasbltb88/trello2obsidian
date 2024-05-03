import Key from '@models/Key';

/**
 * @param {object} object Объект, из которого нужно достать значение свойства.
 * @param {string} propName Строка вида object.subObject.property, чтобы обращаться к вложенным свойствам.
 * @param {string} [delimiter='.'] Символ, используемый как разделитель для вложенных полей в propName.
 */
export const getNestedObjectProperty = <T>(object: Record<Key, any>, propName: Key, delimiter: string = '.'): T => {
    let itemBuffer = object;
    let propArray: Key[] = [];
    if (typeof propName === 'string') {
        propArray = propName.split(delimiter);
    } else if (typeof propName === 'number') {
        propArray = [propName];
    }

    for (let index = 0; index < propArray.length; index++) {
        const propArrayElement = propArray[index];
        itemBuffer = itemBuffer?.[propArrayElement];
    }
    return <T>itemBuffer;
};

export default getNestedObjectProperty;
