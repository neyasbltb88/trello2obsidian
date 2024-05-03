export interface IParseFilePathResult {
    path: string | undefined;
    name: string | undefined;
    ext: string | undefined;
}

/**
 * @description Утилита для парсинга пути к файлу/имени файла на 3 части: путь до файла, имя файла, расширение файла.
 * @param {string} filePath Путь до файла/имя файла.
 * @returns {IParseFilePathResult} Объект с результатом разбора пути/имени.
 */
export const parseFilePath = (filePath: string): IParseFilePathResult => {
    // https://regex101.com/r/vYjxOl/1/
    const regex = /(?<path>.*\/)?(?<name>.+)\.(?<ext>.+)$/u;

    let result = { path: undefined, name: undefined, ext: undefined };
    let res = filePath.match(regex);
    if (!res?.groups) return result;

    return { ...result, ...res.groups };
};

export default parseFilePath;
