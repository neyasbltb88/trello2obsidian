// import { RecordPropsDefinition } from 'vue/types/options';

import { ComponentObjectPropsOptions } from 'vue';

import withTooltipProps from '@mixins/withTooltipProps';

const _withTooltipProps = withTooltipProps();
const tooltipProps = _withTooltipProps.props as ComponentObjectPropsOptions;

const listItemProps: ComponentObjectPropsOptions = {
    ...tooltipProps,

    /** Объект с данными выводимого айтема списка */
    item: {
        type: Object,
        required: true
    },
    /** Состояние, визуально имитирующее наведение мышки на айтем */
    hovered: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Активное состояние айтем, используется для выделения выбранных элементов */
    active: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Имя свойства элемента, в котором лежит его значение */
    valueKey: {
        type: [String, Number],
        required: false,
        default: 'value'
    },
    /** Имя свойства элемента, в котором лежит текст для отображения в списке */
    labelKey: {
        type: [String, Number],
        required: false,
        default: 'label'
    },
    /** Имя свойства элемента, в котором лежит описание элемента */
    captionKey: {
        type: [String, Number],
        required: false,
        default: 'caption'
    },
    /** Имя свойства элемента, в котором лежит текст для отображения во всплывающей подсказке */
    tooltipKey: {
        type: [String, Number],
        required: false,
        default: 'label'
    },
    /** Флаг включения отображения тултипов по наведению */
    tooltip: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Количество линий текста в айтеме */
    lines: {
        type: [String, Number],
        required: false
    },
    /** Количество линий текста в caption айтема */
    captionLines: {
        type: [String, Number],
        required: false
    },
    /** Флаг для компактных айтемов */
    dense: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Флаг, применяющий эффекты кликабельного айтема */
    clickable: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Флаг, добавляющий контролы для выбора айтемов списка */
    selectable: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Класс, который будет дан айтемам списка */
    itemClass: {
        type: String,
        required: false
    },
    /** Цвет ripple-эффекта при клике */
    rippleColor: {
        type: String,
        required: false,
        default: 'ms-theme-white'
    },
    /** Тип контрола в выбираемых айтемах. Может быть checkbox или toggle */
    controlType: {
        type: String,
        required: false,
        default: 'checkbox'
    },
    /** Сторона расположения контрола в айтеме. Может быть left или right */
    controlSide: {
        type: String,
        required: false,
        default: 'left'
    },
    /** Цвет не активного контрола */
    controlBaseColor: {
        type: String,
        required: false,
        default: 'ms-theme-black-light'
    },
    /** Цвет активного контрола */
    controlActiveColor: {
        type: String,
        required: false,
        default: 'ms-theme-blue-main'
    },
    /** Флаг, блокирующий кликабельность айтемов */
    disable: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Флаг, заставляющий игнорировать свойство 'href' айтема, для отключения перехода по ссылке при клике */
    ignoreHref: {
        type: Boolean,
        required: false,
        default: false
    },
    /** Флаг, заставляющий вызывать изменение селекта по клику на элемент */
    selectOnItemClick: {
        type: Boolean,
        required: false,
        default: false
    },
    to: {
        type: Object,
        required: false
    },
    crossed: {
        type: Boolean,
        required: false,
        default: false
    },
    iconKey: {
        type: String,
        required: false,
        default: 'icon'
    },
    iconSizeKey: {
        type: String,
        required: false,
        default: 'iconSize'
    },
    iconSize: {
        type: [Number, String],
        required: false,
        default: 16
    },
    /** Ключ значения позиции иконки относительно лейбла */
    iconPositionKey: {
        type: String,
        required: false,
        default: 'iconPosition'
    },
    /** Положение иконки относительно лейбла (left/right) */
    iconPosition: {
        type: String,
        required: false,
        default: 'left',
        validator: (positionValue: string) => ['left', 'right'].includes(positionValue)
    },
    tag: {
        type: String,
        required: false,
        default: ''
    },
    routeKey: {
        type: String,
        required: false
    },
    loading: {
        type: Boolean,
        required: false
    },
    loadingKey: {
        type: String,
        required: false,
        default: 'loading'
    },
    loadingColor: {
        type: String,
        required: false,
        default: 'ms-theme-black-light'
    },
    loadingSize: {
        type: [Number, String],
        required: false,
        default: 10
    },
    noRipple: {
        type: Boolean,
        required: false,
        default: false
    },
    isDivider: {
        type: Boolean,
        required: false,
        default: false
    },
    emitClickWithSelect: {
        type: Boolean,
        required: false,
        default: false
    },
    colorKey: {
        type: String,
        required: false
    }
};

export default listItemProps;
export { listItemProps, tooltipProps };
