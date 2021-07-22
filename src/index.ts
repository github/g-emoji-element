import {isEmojiSupported} from './emoji-detection'
import {applyTone, applyTones, removeTone} from './tones'

class GEmojiElement extends HTMLElement {
  get image(): HTMLImageElement | null {
    // Check if fallback image already exists since this node may have been
    // cloned from another node
    if (this.firstElementChild instanceof HTMLImageElement) {
      return this.firstElementChild
    } else {
      return null
    }
  }

  get tone(): string {
    return (this.getAttribute('tone') || '')
      .split(' ')
      .map(value => {
        const tone = parseInt(value, 10)
        return tone >= 0 && tone <= 5 ? tone : 0
      })
      .join(' ')
  }

  set tone(modifiers: string) {
    this.setAttribute('tone', modifiers)
  }

  connectedCallback(): void {
    if (this.image === null && !isEmojiSupported()) {
      const src = this.getAttribute('fallback-src')
      if (src) {
        this.textContent = ''
        const image = emojiImage(this)
        image.src = src
        this.appendChild(image)
      }
    }

    if (this.hasAttribute('tone')) {
      updateTone(this)
    }
  }

  static get observedAttributes(): string[] {
    return ['tone']
  }

  attributeChangedCallback(name: string): void {
    switch (name) {
      case 'tone':
        updateTone(this)
        break
    }
  }
}

function updateTone(el: GEmojiElement) {
  if (el.image) return

  const tones = el.tone.split(' ').map(x => parseInt(x, 10))
  if (tones.length === 0) {
    el.textContent = removeTone(el.textContent || '')
  } else if (tones.length === 1) {
    const tone = tones[0]
    el.textContent = tone === 0 ? removeTone(el.textContent || '') : applyTone(el.textContent || '', tone)
  } else {
    el.textContent = applyTones(el.textContent || '', tones)
  }
}

// Generates an <img> child element for a <g-emoji> element.
//
// el - The <g-emoji> element.
//
// Returns an HTMLImageElement.
function emojiImage(el: Element) {
  const image = document.createElement('img')
  image.className = 'emoji'
  image.alt = el.getAttribute('alias') || ''
  image.height = 20
  image.width = 20
  return image
}

export default GEmojiElement

declare global {
  interface Window {
    GEmojiElement: typeof GEmojiElement
  }
  interface HTMLElementTagNameMap {
    'g-emoji': GEmojiElement
  }
}

if (!window.customElements.get('g-emoji')) {
  window.GEmojiElement = GEmojiElement
  window.customElements.define('g-emoji', GEmojiElement)
}
