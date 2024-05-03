import { ComponentObjectPropsOptions } from 'vue';

const qIconCustomProps: ComponentObjectPropsOptions = {
    name: {
        type: String,
        required: true
    },
    colors: {
        type: Object,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    dense: {
        type: Boolean,
        required: false
    },
    size: {
        type: [Number, String],
        required: false,
        default: 24
    }
};

export default qIconCustomProps;
export { qIconCustomProps };
