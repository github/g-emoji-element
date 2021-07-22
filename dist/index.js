function isEmojiSupported() {
    const onWindows7 = /\bWindows NT 6.1\b/.test(navigator.userAgent);
    const onWindows8 = /\bWindows NT 6.2\b/.test(navigator.userAgent);
    const onWindows81 = /\bWindows NT 6.3\b/.test(navigator.userAgent);
    const onFreeBSD = /\bFreeBSD\b/.test(navigator.userAgent);
    const onLinux = /\bLinux\b/.test(navigator.userAgent) && !/\bAndroid\b/.test(navigator.userAgent);
    return !(onWindows7 || onWindows8 || onWindows81 || onLinux || onFreeBSD);
}

const supported = new Set([]);
function isModifiable(emoji) {
    return supported.has(emoji);
}

const ZERO_WIDTH_JOINER = '\u{200d}';
const VARIATION_16 = 0xfe0f;
function applyTone(sequence, tone) {
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
function applyTones(sequence, tones) {
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
function removeTone(emoji) {
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

class GEmojiElement extends HTMLElement {
    get image() {
        if (this.firstElementChild instanceof HTMLImageElement) {
            return this.firstElementChild;
        }
        else {
            return null;
        }
    }
    get tone() {
        return (this.getAttribute('tone') || '')
            .split(' ')
            .map(value => {
            const tone = parseInt(value, 10);
            return tone >= 0 && tone <= 5 ? tone : 0;
        })
            .join(' ');
    }
    set tone(modifiers) {
        this.setAttribute('tone', modifiers);
    }
    connectedCallback() {
        if (this.image === null && !isEmojiSupported()) {
            const src = this.getAttribute('fallback-src');
            if (src) {
                this.textContent = '';
                const image = emojiImage(this);
                image.src = src;
                this.appendChild(image);
            }
        }
        if (this.hasAttribute('tone')) {
            updateTone(this);
        }
    }
    static get observedAttributes() {
        return ['tone'];
    }
    attributeChangedCallback(name) {
        switch (name) {
            case 'tone':
                updateTone(this);
                break;
        }
    }
}
function updateTone(el) {
    if (el.image)
        return;
    const tones = el.tone.split(' ').map(x => parseInt(x, 10));
    if (tones.length === 0) {
        el.textContent = removeTone(el.textContent || '');
    }
    else if (tones.length === 1) {
        const tone = tones[0];
        el.textContent = tone === 0 ? removeTone(el.textContent || '') : applyTone(el.textContent || '', tone);
    }
    else {
        el.textContent = applyTones(el.textContent || '', tones);
    }
}
function emojiImage(el) {
    const image = document.createElement('img');
    image.className = 'emoji';
    image.alt = el.getAttribute('alias') || '';
    image.height = 20;
    image.width = 20;
    return image;
}
if (!window.customElements.get('g-emoji')) {
    window.GEmojiElement = GEmojiElement;
    window.customElements.define('g-emoji', GEmojiElement);
}

export default GEmojiElement;
