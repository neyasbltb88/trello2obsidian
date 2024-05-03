import { objectForEach, parseFilePath } from '@utils';

// FIXME: На Vite не работает такой динамический импорт всего содержимого папки
// const svgFiles = require.context('./icons', true, /\.svg$/);
// console.log('svgFiles: ', svgFiles);
// console.log('svgFiles keys: ', svgFiles.keys());

const svgFiles: Record<string, string> = import.meta.glob('./icons/*.svg', {
    eager: true,
    query: '?url',
    import: 'default'
});

/** Этот файл собирает и импортирует все иконки из папки "src/services/utils/svgIcons/icons" в виде обычного объекта.
 * Это заменяет устаревший файл "svg-icon-template.js", не ломая его формат.
 * Иконки теперь можно добавлять просто в папку, не собирая их внутри одного файла. */
const icons: Record<string, string> = {};

const importAll = (r: Record<string, string>) => {
    // FIXME: На Vite другая реализация получения контента иконок
    objectForEach(r, (icon, path) => {
        const { name } = parseFilePath(path);
        if (!name) return;

        icon = decodeURIComponent(icon).replace('data:image/svg+xml,', '');
        icons[name] = icon;
    });
};

importAll(svgFiles);

export default icons;
