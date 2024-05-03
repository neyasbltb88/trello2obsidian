import { ComponentOptions } from 'vue';

import { kebabToCamel, getColorPaletteName } from '@utils';

/** Функция-конструктор, которая возвращает функцию для составления имен пропсов тултипа с учетом переданного префикса */
const createGetNameParam =
    (tooltipName = '') =>
    (param: string): string =>
        kebabToCamel(`${tooltipName ? tooltipName + '-' : ''}${param}`);

const withTooltipProps = (tooltipName = ''): ComponentOptions => {
    const getNameParam = createGetNameParam(tooltipName);

    return {
        props: {
            [getNameParam('tooltip')]: {
                type: [Boolean, String],
                required: false
            },
            [getNameParam('tooltipDelay')]: {
                type: Number,
                required: false,
                default: 700
            },
            [getNameParam('tooltipPosition')]: {
                type: String,
                required: false,
                default: 'top'
            },
            [getNameParam('tooltipTransitionShow')]: {
                type: String,
                required: false,
                default: 'jump-down'
            },
            [getNameParam('tooltipTransitionHide')]: {
                type: String,
                required: false,
                default: 'jump-up'
            },
            [getNameParam('tooltipBackgroundColor')]: {
                type: String,
                required: false,
                default: 'ms-theme-dark'
            },
            [getNameParam('tooltipColor')]: {
                type: String,
                required: false,
                default: '#fff'
            },
            [getNameParam('tooltipOffset')]: {
                type: Array,
                required: false,
                default: () => [14, 14]
            }
        },
        computed: {
            [getNameParam('anchor')]: {
                get() {
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'top') return 'top middle';
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'right') return 'center right';
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'bottom') return 'bottom middle';
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'left') return 'center left';
                }
            },
            [getNameParam('self')]: {
                get() {
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'top') return 'center middle';
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'right') return 'center left';
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'bottom') return 'top middle';
                    // @ts-ignore
                    if (this[getNameParam('tooltipPosition')] === 'left') return 'center right';
                }
            },

            [getNameParam('tooltipContentClass')]: {
                get() {
                    let result = '';
                    result += `bg-${getColorPaletteName(
                        // @ts-ignore
                        this[getNameParam('tooltipBackgroundColor')],
                        // @ts-ignore
                        this?.$refs?.btn?.$el
                    )}`;
                    // @ts-ignore
                    result += ` text-${getColorPaletteName(this[getNameParam('tooltipColor')], this?.$refs?.btn?.$el)}`;

                    return result;
                }
            }
        }
    };
};

export default withTooltipProps;
export { withTooltipProps, createGetNameParam };
