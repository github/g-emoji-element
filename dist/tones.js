import { isModifiable } from './modifiers';
const ZERO_WIDTH_JOINER = '\u{200d}';
const VARIATION_16 = 0xfe0f;
export function applyTone(sequence, tone) {
    const sequenceWithToneRemoved = removeTone(sequence);
    if (!isModifiable(sequenceWithToneRemoved))
        return sequence;
    const modifier = toneModifier(tone);
    if (!modifier)
        return sequence;
    return sequenceWithToneRemoved
        .split(ZERO_WIDTH_JOINER)
        .map(emoji => (isModifiable(emoji) ? tint(emoji, modifier) : emoji))
        .join(ZERO_WIDTH_JOINER);
}
export function applyTones(sequence, tones) {
    const sequenceWithToneRemoved = removeTone(sequence);
    if (!isModifiable(sequenceWithToneRemoved))
        return sequence;
    const modifiers = tones.map(t => toneModifier(t));
    return sequenceWithToneRemoved
        .split(ZERO_WIDTH_JOINER)
        .map(emoji => {
        if (!isModifiable(emoji))
            return emoji;
        const modifier = modifiers.shift();
        return modifier ? tint(emoji, modifier) : emoji;
    })
        .join(ZERO_WIDTH_JOINER);
}
export function removeTone(emoji) {
    return [...emoji].filter(ch => !isTone(ch.codePointAt(0))).join('');
}
function tint(emoji, tone) {
    const points = [...emoji].map(p => p.codePointAt(0));
    if (points[1] && (isTone(points[1]) || points[1] === VARIATION_16)) {
        points[1] = tone;
    }
    else {
        points.splice(1, 0, tone);
    }
    return String.fromCodePoint(...points);
}
function isTone(point) {
    return point >= 0x1f3fb && point <= 0x1f3ff;
}
function toneModifier(id) {
    switch (id) {
        case 1:
            return 0x1f3fb;
        case 2:
            return 0x1f3fc;
        case 3:
            return 0x1f3fd;
        case 4:
            return 0x1f3fe;
        case 5:
            return 0x1f3ff;
        default:
            return null;
    }
}
