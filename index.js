/* @flow strict */

import {isEmojiSupported} from './emoji-detection'
import {isModifiable} from './modifiers'

class GEmojiElement extends HTMLElement {
  get image() {
    // Check if fallback image already exists since this node may have been
    // cloned from another node
    if (this.firstElementChild instanceof HTMLImageElement) {
      return this.firstElementChild
    } else {
      return null
    }
  }

  get tone(): number {
    const tone = parseInt(this.getAttribute('tone'), 10)
    return MODIFIERS.includes(tone) ? tone : 0
  }

  set tone(modifier: MODIFIERS) {
    this.setAttribute('tone', String(modifier))
  }

  connectedCallback() {
    if (this.image === null && !isEmojiSupported()) {
      this.textContent = ''
      const image = emojiImage(this)
      image.src = this.getAttribute('fallback-src') || ''
      this.appendChild(image)
    }
  }

  static get observedAttributes(): Array<string> {
    return ['tone']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'tone':
        updateTone(this)
        break
    }
  }
}

function updateTone(el: GEmojiElement, modifier: number) {
  if (el.image) return
  if (!isModifiable(el.textContent)) return

  const point = toneModifier(el.tone)
  if (point) {
    el.textContent = applyTone(el.textContent, point)
  } else {
    el.textContent = removeTone(el.textContent)
  }
}

function toneModifier(id: number): ?number {
  switch (id) {
    case 1:
      return 0x1f3fb
    case 2:
      return 0x1f3fc
    case 3:
      return 0x1f3fd
    case 4:
      return 0x1f3fe
    case 5:
      return 0x1f3ff
    default:
      return null
  }
}

function isTone(point: number): boolean {
  return point >= 0x1f3fb && point <= 0x1f3ff
}

function applyTone(emoji: string, tone: number): string {
  const points = [...removeTone(emoji)].map(ch => ch.codePointAt(0))
  return String.fromCodePoint(...points, tone)
}

function removeTone(emoji: string): string {
  return [...emoji].filter(ch => !isTone(ch.codePointAt(0))).join('')
}

// Generates an <img> child element for a <g-emoji> element.
//
// el - The <g-emoji> element.
//
// Returns an HTMLImageElement.
function emojiImage(el) {
  const image = document.createElement('img')
  image.className = 'emoji'
  image.alt = el.getAttribute('alias') || ''
  image.height = 20
  image.width = 20
  return image
}

export default GEmojiElement

if (!window.customElements.get('g-emoji')) {
  window.GEmojiElement = GEmojiElement
  window.customElements.define('g-emoji', GEmojiElement)
}
