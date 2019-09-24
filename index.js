/* @flow strict */

import {isEmojiSupported} from './emoji-detection'
import {applyTone, applyTones, removeTone} from './tones'

type SkinTone = 0 | 1 | 2 | 3 | 4 | 5

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
    return tone >= 0 && tone <= 5 ? tone : 0
  }

  set tone(modifier: SkinTone) {
    this.setAttribute('tone', String(modifier))
  }

  get tones(): Array<number> {
    return (this.getAttribute('tones') || '').split(' ').map(value => {
      const tone = parseInt(value, 10)
      return tone >= 0 && tone <= 5 ? tone : 0
    })
  }

  set tones(modifiers: Array<SkinTone>) {
    this.setAttribute('tones', modifiers.join(' '))
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
    return ['tone', 'tones']
  }

  attributeChangedCallback(name: string) {
    switch (name) {
      case 'tone':
        updateTone(this)
        break
      case 'tones':
        updateTones(this)
        break
    }
  }
}

function updateTone(el: GEmojiElement) {
  if (el.image) return
  el.textContent = el.tone === 0 ? removeTone(el.textContent) : applyTone(el.textContent, el.tone)
}

function updateTones(el: GEmojiElement) {
  if (el.image) return
  el.textContent = applyTones(el.textContent, el.tones)
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
