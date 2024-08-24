export default (text: string) => {
    return text
        .replace(/\|/g, ' ')
        .replace(/\-/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};