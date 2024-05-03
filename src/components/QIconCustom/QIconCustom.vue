<template>
    <q-icon
        class="QIconCustom q-icon q-icon-custom"
        :class="{ 'q-icon-custom-dense': dense, [`icon-${name}`]: true }"
        :draggable="false"
        :name="src"
        :size="iconSize"
        :color="fontIconColor"
    >
        <slot name="default" v-bind="{ src, iconSize, fontIconColor }" />
    </q-icon>
</template>

<script>
import getColorPaletteValue from '@utils/getColorPaletteValue';
import getColorPaletteName from '@utils/getColorPaletteName';
import svgIconTemplate from '@utils/templateFunctions/svgIconTemplate';

import qIconCustomProps from './qIconCustomProps';

export default {
    name: 'QIconCustom',
    components: {
        QIcon
    },
    props: {
        ...qIconCustomProps
    },
    data() {
        return {
            // https://regex101.com/r/YV1wbj/1
            regexTemplate: /{{(\w+\d?)}}/gm,
            // https://regex101.com/r/WvzsTC/2
            regexImgData: /^data:image\/.+/m,
            prefixImg: 'img:',
            prefix: 'img:data:image/svg+xml;charset=utf-8,',
            defaultPrimary: 'ms-theme-black-light'
        };
    },
    computed: {
        iconSize() {
            return typeof this.size === 'number' ? this.size + 'px' : this.size;
        },
        currentColors() {
            let colors = {};
            for (let name in this.colors) {
                // Если передано имя зарегистрированного цвета, берем значение цвета,
                // если нет - то оставляем как есть, значит передано уже само значение
                colors[name] = getColorPaletteValue(this.colors[name]);
            }
            // Если передан пропс с одним цветом, ставим его как основной - primary
            if (this.color) {
                colors.primary = getColorPaletteValue(this.color);
            }

            if (!colors.primary) {
                colors.primary = getColorPaletteValue(this.defaultPrimary);
            }

            return colors;
        },
        src() {
            // Проверка на переданную иконку в data-строке
            let imgDataMatch = this.name.match(this.regexImgData);
            if (imgDataMatch && imgDataMatch[0]) {
                return this.prefixImg + imgDataMatch[0];
            }

            let template = svgIconTemplate(this.name, this.currentColors);

            // Если не найдена иконка среди объекта кастомных иконок, то
            // будем считать что нужна шрифтовая иконка, и возвращаем само ее название
            if (!template) return this.name;

            // Если кастомная иконка была найдена, то подготавливаем ее для использования в качестве src
            return this.prefix + encodeURIComponent(template);
        },
        fontIconColor() {
            return getColorPaletteName(this.currentColors.primary);
        }
    }
};
</script>

<style lang="sass" scoped>
.q-icon-custom
    &-dense
        width: 18px
        height: 18px
</style>
