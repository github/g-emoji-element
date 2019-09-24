/* @flow strict */

import {isModifiable} from './modifiers'

const ZERO_WIDTH_JOINER = '\u{200d}'
const VARIATION_16 = 0xfe0f

export function applyTone(sequence: string, tone: number): string {
  const tone2 = toneModifier(tone)
  if (!tone2) return sequence
  return sequence
    .split(ZERO_WIDTH_JOINER)
    .map(emoji => (isModifiable(emoji) ? tint(emoji, tone2) : emoji))
    .join(ZERO_WIDTH_JOINER)
}

export function applyTones(sequence: string, tones: Array<number>): string {
  const tones2 = tones.map(t => toneModifier(t))
  return sequence
    .split(ZERO_WIDTH_JOINER)
    .map(emoji => {
      if (!isModifiable(emoji)) return emoji
      const tone = tones2.shift()
      return tone ? tint(emoji, tone) : emoji
    })
    .join(ZERO_WIDTH_JOINER)
}

export function removeTone(emoji: string): string {
  return [...emoji].filter(ch => !isTone(ch.codePointAt(0))).join('')
}

function tint(emoji: string, tone: number): string {
  const points = [...emoji].map(p => p.codePointAt(0))
  if (points[1] && (isTone(points[1]) || points[1] === VARIATION_16)) {
    points[1] = tone
  } else {
    points.splice(1, 0, tone)
  }
  return String.fromCodePoint(...points)
}

function isTone(point: number): boolean {
  return point >= 0x1f3fb && point <= 0x1f3ff
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
