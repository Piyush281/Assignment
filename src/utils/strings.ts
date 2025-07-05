const titleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const shortParagraph = (str: string, maxLength: number = 100): string => {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + "...";
}

export const stringUtils = {
    titleCase,
    shortParagraph,
}