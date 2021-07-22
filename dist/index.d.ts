declare class GEmojiElement extends HTMLElement {
    get image(): HTMLImageElement | null;
    get tone(): string;
    set tone(modifiers: string);
    connectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string): void;
}
export default GEmojiElement;
declare global {
    interface Window {
        GEmojiElement: typeof GEmojiElement;
    }
    interface HTMLElementTagNameMap {
        'g-emoji': GEmojiElement;
    }
}
