const supported = new Set([]);
export function isModifiable(emoji) {
    return supported.has(emoji);
}
