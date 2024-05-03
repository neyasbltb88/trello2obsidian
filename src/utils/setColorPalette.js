// import { colors as quasarColors } from 'quasar';
// const { setBrand } = quasarColors;
// FIXME: Изменение в Q2
import { setCssVar as setBrand } from 'quasar';

const steleElemId = 'dynamicColorPalette';

const templateStyle = color => {
    return `
    .text-\\${color} {
        color: var(--q-color-\\${color}) !important;
    }
    .bg-\\${color} {
        background: var(--q-color-\\${color}) !important;
    }`;
};

const createStyleElem = () => {
    let steleElem = document.createElement('style');
    steleElem.id = steleElemId;
    document.head.appendChild(steleElem);

    return steleElem;
};

const appendStyle = color => {
    let steleElem = document.querySelector(`#${steleElemId}`) || createStyleElem();
    steleElem.textContent += templateStyle(color);
};

export const setColorPalette = (color, el) => {
    setBrand(color, color, el);
    appendStyle(color);
};

export default setColorPalette;
