export default class GEmojiElement extends HTMLElement {
  image?: HTMLImageElement
  tone: number
}

declare global {
  interface Window {
    GEmojiElement: typeof GEmojiElement
  }
}
