/* @flow strict */

import {isEmojiSupported} from './emoji-detection'

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

  set tone(modifier: number) {
    if (this.image) return
    const point = toneModifier(modifier)
    if (point) {
      this.textContent = applyTone(this.textContent, point)
    } else {
      this.textContent = removeTone(this.textContent)
    }
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
        this.tone = parseInt(newValue, 10)
        break
    }
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
  const points = [...emoji].map(ch => ch.codePointAt(0))
  if (points[1] && isTone(points[1])) {
    points[1] = tone
  } else {
    points.splice(1, 0, tone)
  }
  return String.fromCodePoint(...points)
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
