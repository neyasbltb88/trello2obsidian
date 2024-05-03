import { ComponentOptions, ComponentObjectPropsOptions, ComputedOptions, ComponentPublicInstance } from 'vue';

import { objectForEach, omit } from '@utils';

export type TPropsRecords = Record<string, ComponentObjectPropsOptions | string[]>;

/**
 * Имя ключа, под которым под видом пропса в объекте ComponentPropsOptions можно передать массив строк.
 * Каждая строка из этого массива будет означать ключ для локальных данных компонента,
 * которые так же будут включены в объект, возвращаемый компьютедом соответствующей группы пропсов.
 * Под этим ключом можно передавать имена свойств данных компонента,
 * которые будут прокинуты в качестве пропсов в соответствующей группе.
 * @see src\components\common\ActionButtonDropdownList.vue
 */
export const COMPONENT_DATA_KEY = 'COMPONENT_DATA';

/**
 * @description Позволяет в компоненте, где применяется, объединять и использовать в качестве собственных пропсов
 * пропсы из одного или нескольких компонентов. Может применяться для компонентов,
 * которые оборачивают несколько других компонентов, пропсы которых должны прокидываться наружу
 * этого компонента-обертки для гибкой настройки внутренних компонентов.
 * Миксин объединяет в пропсы собственного компонента все переданные в аргументе пропсы,
 * импортированные из других компонентов, и предоставляет одноименные переданным группам пропсов computed свойства,
 * которые можно пробрасывать через v-bind прямо на компоненты, из которых они импортировались.
 * @see Пример использования в src\components\common\DateRangePickerPopup.vue
 * @param {TPropsRecords} propsRecords Принимает объект, в котором ключи служат для последующей идентификации групп пропсов,
 * а значения - объект пропсов, например:
 * { componentNameProps: {
 *      value: { type: Boolean, required: true },
 *      color: { type: String, required: false },
 *      ...еще пропсы компонента
 *      [COMPONENT_DATA_KEY]: ['key_1', 'key_2', ...]
 *   },
 *   otherComponentNameProps: {
 *      ...пропсы другого компонента
 *   }
 * }
 * @returns Возвращает функцию, принимающую объект, описывающий группы пропсов, вызов которой вернет объект миксина.
 */
const withProps = (propsRecords: TPropsRecords): ComponentOptions => {
    let _props: ComponentObjectPropsOptions = {};
    let _computed: ComputedOptions = {};

    objectForEach(propsRecords, (props, propsName) => {
        /** Массив ключей локальных данных, которые нужно пробросить из компонента
         * в виде пропсов в составе определенной группы */
        // @ts-ignore
        let componentDataKeys: string[] = Array.isArray(props[COMPONENT_DATA_KEY]) ? props[COMPONENT_DATA_KEY] : [];
        Object.assign(_props, omit(props, [COMPONENT_DATA_KEY]));

        _computed[propsName] = function (this: ComponentPublicInstance) {
            let props_: Record<string, any> = {};
            objectForEach(props, (propValue, propKey) => {
                // Игнорируем псевдо-пропс с массивом локальных ключей
                // @ts-ignore
                if (propKey === COMPONENT_DATA_KEY) return;

                // @ts-ignore
                props_[propKey] = this.$props[propKey];
            });

            // Проходимся по массиву локальных ключей и по каждому ключу закидываем данные в объект,
            // который содержит значения указанных пропсов + эти локальные данные компонента
            // @ts-ignore
            componentDataKeys.forEach(dataKey => (props_[dataKey] = this[dataKey]));

            return props_;
        };
    });

    return { props: _props, computed: _computed };
};

export default withProps;
