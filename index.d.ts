export default class GEmojiElement extends HTMLElement {
  image?: HTMLImageElement
  tone: string
}

declare global {
  interface Window {
    GEmojiElement: typeof GEmojiElement
  }
  interface HTMLElementTagNameMap {
    'g-emoji': GEmojiElement
  }
}