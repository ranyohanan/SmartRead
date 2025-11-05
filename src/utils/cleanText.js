export function cleanText(str) {
    return str
        .replace(/\r\n?/g, '\n')
        .replace(/\t/g, ' ')
        .replace(/ +/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}