// import { colors as quasarColors } from 'quasar';
// const { getBrand } = quasarColors;
// FIXME: Изменение в Q2
import { getCssVar as getBrand } from 'quasar';

import setColorPalette from './setColorPalette';

// Если передано имя зарегистрированного цвета - вернуть это имя
// Если передан сам цвет - зарегистрировать его и вернуть его имя
export const getColorPaletteName = (color, el) => {
    let colorName = getBrand(color, el);
    if (colorName) return color;

    setColorPalette(color, el);

    return color;
};

export default getColorPaletteName;
