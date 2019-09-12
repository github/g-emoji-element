export default class GEmojiElement extends HTMLElement {
  image?: HTMLImageElement
}

declare global {
  interface Window {
    GEmojiElement: GEmojiElement
  }
}
