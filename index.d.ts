type SkinTone = 0 | 1 | 2 | 3 | 4 | 5

export default class GEmojiElement extends HTMLElement {
  image?: HTMLImageElement
  tone: SkinTone
  tones: Array<SkinTone>
}

declare global {
  interface Window {
    GEmojiElement: typeof GEmojiElement
  }
}
