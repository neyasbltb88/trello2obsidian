import { ComponentObjectPropsOptions } from 'vue';

import withTooltipProps from '@mixins/withTooltipProps';

const _withTooltipProps = withTooltipProps();
const tooltipProps = _withTooltipProps.props as ComponentObjectPropsOptions;

const miniBtnPropsWithoutTooltip: ComponentObjectPropsOptions = {
    size: {
        type: Number,
        required: false,
        default: 8
    },
    title: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: false,
        default: false
    },
    color: {
        type: String,
        required: false,
        default: 'ms-theme-blue-main'
    },
    activeColor: {
        type: String,
        required: false,
        default: 'ms-theme-blue-main'
    },
    otherColors: {
        type: Object,
        required: false,
        default: () => ({})
    },
    icon: {
        type: String,
        required: false,
        default: 'help'
    },
    activeIcon: {
        type: String,
        required: false
    },
    cornerIcon: {
        type: String,
        required: false
    },
    cornerIconColor: {
        type: String,
        required: false,
        default: 'ms-theme-blue-main'
    },
    cornerIconSize: {
        type: Number,
        required: false,
        default: 10
    },
    disable: {
        type: Boolean,
        required: false,
        default: false
    },
    loading: {
        type: Boolean,
        required: false,
        default: false
    },
    round: {
        type: Boolean,
        required: false,
        default: true
    },
    flat: {
        type: Boolean,
        required: false,
        default: true
    },
    outline: {
        type: Boolean,
        required: false,
        default: false
    }
};

const miniBtnProps: ComponentObjectPropsOptions = {
    ...tooltipProps,
    ...miniBtnPropsWithoutTooltip
};

export default miniBtnProps;
export { miniBtnProps, tooltipProps, miniBtnPropsWithoutTooltip };
