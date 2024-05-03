import getColorPaletteValue from '@utils/getColorPaletteValue';
import svgTemplate from '@utils/svgIcons';

const defaultPrimary = 'ms-grey';

// https://regex101.com/r/YV1wbj/1
const regexTemplate = /{{(\w+\d?)}}/g;

/**
 * @description Утилита для шаблонизации цветов в кастомных svg иконках, которые хранятся
 * в папке "src/services/utils/svgIcons/icons".
 * @param {string} icon Имя иконки(ключ, под которым иконка лежит в "src/services/utils/svgIcons/icons").
 * @param {Record<string, string>} [colors={}] Объект именованных цветов для шаблонизации
 * соответствующих мест в svg иконке из папки "src/services/utils/svgIcons/icons".
 * @returns {string} Возвращает строку с svg.
 */
const svgIconTemplate = (icon: keyof typeof svgTemplate, colors: Record<string, string> = {}): string | undefined => {
    if (!icon) return;
    let template: string = svgTemplate[icon];
    if (!template) return;

    const _colors: Record<string, string> = {};
    for (const colorName in colors) {
        // Если передано имя зарегистрированного цвета, берем значение цвета,
        // если нет - то оставляем как есть, значит передано уже само значение
        _colors[colorName] = getColorPaletteValue(colors[colorName]);
    }
    if (!_colors.primary) {
        _colors.primary = getColorPaletteValue(defaultPrimary);
    }

    const colorReplace = (...match: string[]): string => {
        /*
            0: "{{color1}}"
            1: "color1"
            2: 0
            3: "{{color1}}-ljlkjl-{{color2}}"
        */
        return _colors[match[1]] ?? _colors.primary;
    };

    template = template.replace(regexTemplate, colorReplace);

    return template;
};

export default svgIconTemplate;
