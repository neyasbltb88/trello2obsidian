// import { colors as quasarColors } from 'quasar';
// const { getBrand } = quasarColors;
// FIXME: Изменение в Q2
import { getCssVar as getBrand } from 'quasar';

// Если передано имя зарегистрированного цвет - вернуть сам цвет
// Если не найдено значения, значит был передан сам цвет, вернуть его
export const getColorPaletteValue = (color, el) => {
    let colorValue = getBrand(color, el);
    if (colorValue) return colorValue;

    return color;
};

export default getColorPaletteValue;
