# &lt;g-emoji&gt; element

Backports native emoji characters to browsers that don't support them by replacing the characters with fallback images.

## Installation

```
$ npm install @github/g-emoji-element
```

## Usage

```js
import '@github/g-emoji-element'
```

```html
<g-emoji fallback-src="t-rex.png" alias="T-Rex">🦖</g-emoji>
```

If a browser supports emoji, nothing happens. If a browser does not support emoji, a fallback image tag is created:

```html
<g-emoji fallback-src="t-rex.png" alias="T-Rex">
  <img class="emoji" alt="T-Rex" height="20" width="20" src="t-rex.png">
</g-emoji>
```

### Skin tones

The `tone` attribute renders the emoji with a [skin tone modifier][scale] between 1-5. Use
0 to display the default tone.

[scale]: https://en.wikipedia.org/wiki/Fitzpatrick_scale

```html
<g-emoji tone="0">👋</g-emoji>
<g-emoji tone="1">👋🏻</g-emoji>
<g-emoji tone="2">👋🏼</g-emoji>
<g-emoji tone="3">👋🏽</g-emoji>
<g-emoji tone="4">👋🏾</g-emoji>
<g-emoji tone="5">👋🏿</g-emoji>
```

```js
> const emoji = document.createElement('g-emoji')
> emoji.textContent = '👋'
> emoji.tone = '5'
> document.body.append(emoji)
> emoji.textContent
"👋🏿"
```

The `tone` attribute accepts a space separated list of skin tone modifiers to apply
to each base emoji in a sequence. Some platforms will display these sequences
as a single glyph while others will render each emoji in the sequence.

```html
<g-emoji tone="4 5">🧑🏾<200d>🤝<200d>🧑🏿</g-emoji>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Microsoft Edge

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.


## 🌐 Web Resources & Aesthetic Symbols Index
- [AESTHETIC STARDUST COMBO](https://aestheticsymbols.io/symbol/aesthetic-stardust-combo/)
- [NATURE FLOWERS](https://aestheticsymbols.io/es/nature-flowers/)
- [SYM 1F922](https://aestheticsymbols.io/symbol/sym-1f922/)
- [SIX POINTED BLACK STAR](https://aestheticsymbols.io/symbol/six-pointed-black-star/)
- [SYM 2731](https://aestheticsymbols.io/symbol/sym-2731/)
- [SYM 1D434](https://aestheticsymbols.io/symbol/sym-1d434/)
- [GOTHIC OBSIDIAN SKULL CREST](https://aestheticsymbols.io/symbol/gothic-obsidian-skull-crest/)
- [ZODIAC CELESTIAL](https://aestheticsymbols.io/vi/zodiac-celestial/)
- [SYM 1F927](https://aestheticsymbols.io/symbol/sym-1f927/)
- [DISCORD STATUS](https://aestheticsymbols.io/vi/discord-status/)
- [INSTAGRAM BIO](https://aestheticsymbols.io/instagram-bio/)
- [ROTATED FLORAL HEART](https://aestheticsymbols.io/symbol/rotated-floral-heart/)
- [TWELVE POINTED STAR](https://aestheticsymbols.io/symbol/twelve-pointed-star/)
- [ZODIAC CELESTIAL](https://aestheticsymbols.io/es/zodiac-celestial/)
- [SYM 1FAE5](https://aestheticsymbols.io/symbol/sym-1fae5/)
- [FREEFIRE NAMES](https://aestheticsymbols.io/vi/freefire-names/)
- [GREEK PSI TRIDENT](https://aestheticsymbols.io/symbol/greek-psi-trident/)
- [BORDERS DIVIDERS](https://aestheticsymbols.io/borders-dividers/)
- [SYM 1F642 200D 2194 FE0F](https://aestheticsymbols.io/symbol/sym-1f642-200d-2194-fe0f/)
- [STARRY LOVE AURA](https://aestheticsymbols.io/symbol/starry-love-aura/)
- [SYM 1F92E](https://aestheticsymbols.io/symbol/sym-1f92e/)
- [SYM 1F92C](https://aestheticsymbols.io/symbol/sym-1f92c/)
- [DAGGER CROSS SYMBOL](https://aestheticsymbols.io/symbol/dagger-cross-symbol/)
- [SYM 263A FE0F](https://aestheticsymbols.io/symbol/sym-263a-fe0f/)
- [SYM 1F920](https://aestheticsymbols.io/symbol/sym-1f920/)
- [MUSIC WEATHER](https://aestheticsymbols.io/vi/music-weather/)
- [AESTHETICSYMBOLS.IO](https://aestheticsymbols.io/)
- [SYM 1F60E](https://aestheticsymbols.io/symbol/sym-1f60e/)
- [HOLLOW STAR](https://aestheticsymbols.io/symbol/hollow-star/)
- [TRENDING](https://aestheticsymbols.io/trending/)
- [SYM 1F61B](https://aestheticsymbols.io/symbol/sym-1f61b/)
- [SYM 1F635 200D 1F4AB](https://aestheticsymbols.io/symbol/sym-1f635-200d-1f4ab/)
- [KAOMOJI](https://aestheticsymbols.io/kaomoji/)
- [QUARTER MUSICAL NOTE](https://aestheticsymbols.io/symbol/quarter-musical-note/)
- [SYM 1F626](https://aestheticsymbols.io/symbol/sym-1f626/)
- [SYM 1F622](https://aestheticsymbols.io/symbol/sym-1f622/)
- [FLORAL BRANCH BOUQUET](https://aestheticsymbols.io/symbol/floral-branch-bouquet/)
- [RIGHT POINTING DOUBLE ANGLE QUOTATION](https://aestheticsymbols.io/symbol/right-pointing-double-angle-quotation/)
- [SYM 1F979](https://aestheticsymbols.io/symbol/sym-1f979/)
- [DISCORD STATUS](https://aestheticsymbols.io/pt/discord-status/)
- [SYM 1F9D0](https://aestheticsymbols.io/symbol/sym-1f9d0/)
- [ROYAL GOLD CROWN](https://aestheticsymbols.io/symbol/royal-gold-crown/)
- [SYM 1F642 200D 2195 FE0F](https://aestheticsymbols.io/symbol/sym-1f642-200d-2195-fe0f/)
- [CLOUD WEATHER SYMBOL](https://aestheticsymbols.io/symbol/cloud-weather-symbol/)
- [SYM 1F49F](https://aestheticsymbols.io/symbol/sym-1f49f/)
- [MUSIC WEATHER](https://aestheticsymbols.io/ru/music-weather/)
- [SYM 1F612](https://aestheticsymbols.io/symbol/sym-1f612/)
- [SPRING TULIP BLOSSOM](https://aestheticsymbols.io/symbol/spring-tulip-blossom/)
- [SYM 1F603](https://aestheticsymbols.io/symbol/sym-1f603/)
- [INSTAGRAM BIO](https://aestheticsymbols.io/pt/instagram-bio/)
- [SYM 2763 FE0F](https://aestheticsymbols.io/symbol/sym-2763-fe0f/)
- [ROBLOX NAMES](https://aestheticsymbols.io/pt/roblox-names/)
- [SYM 1F632](https://aestheticsymbols.io/symbol/sym-1f632/)
- [SPARKLE DOT FLARE](https://aestheticsymbols.io/symbol/sparkle-dot-flare/)
- [NATURE FLOWERS](https://aestheticsymbols.io/vi/nature-flowers/)
- [SYM 2721](https://aestheticsymbols.io/symbol/sym-2721/)
- [SYM 1F49C](https://aestheticsymbols.io/symbol/sym-1f49c/)
- [EIGHT POINTED STAR](https://aestheticsymbols.io/symbol/eight-pointed-star/)
- [SYM 1F624](https://aestheticsymbols.io/symbol/sym-1f624/)
- [SYM 1F976](https://aestheticsymbols.io/symbol/sym-1f976/)
- [SYM 1F92F](https://aestheticsymbols.io/symbol/sym-1f92f/)
- [CROSSED SWORDS](https://aestheticsymbols.io/symbol/crossed-swords/)
- [SYM 1F911](https://aestheticsymbols.io/symbol/sym-1f911/)
- [MUSIC FLAT SIGN](https://aestheticsymbols.io/symbol/music-flat-sign/)
- [FREEFIRE NAMES](https://aestheticsymbols.io/pt/freefire-names/)
- [SYM 1F642](https://aestheticsymbols.io/symbol/sym-1f642/)
- [ARIES ZODIAC RAM](https://aestheticsymbols.io/symbol/aries-zodiac-ram/)
- [SYM 1D45D](https://aestheticsymbols.io/symbol/sym-1d45d/)
- [SYM 265C](https://aestheticsymbols.io/symbol/sym-265c/)
- [SYM 1F625](https://aestheticsymbols.io/symbol/sym-1f625/)
- [SYM 1D401](https://aestheticsymbols.io/symbol/sym-1d401/)
- [SYM 1D419](https://aestheticsymbols.io/symbol/sym-1d419/)
- [SYM 260C](https://aestheticsymbols.io/symbol/sym-260c/)
- [SYM 26E3](https://aestheticsymbols.io/symbol/sym-26e3/)
- [TAURUS ZODIAC BULL](https://aestheticsymbols.io/symbol/taurus-zodiac-bull/)
- [SYM 1FAE8](https://aestheticsymbols.io/symbol/sym-1fae8/)
- [SYM 267A](https://aestheticsymbols.io/symbol/sym-267a/)
- [STARS](https://aestheticsymbols.io/ja/stars/)
- [SYM 1F605](https://aestheticsymbols.io/symbol/sym-1f605/)
- [SYM 26B2](https://aestheticsymbols.io/symbol/sym-26b2/)
- [SYM 267F](https://aestheticsymbols.io/symbol/sym-267f/)
- [HEAVY RIGHTWARD ARROW](https://aestheticsymbols.io/symbol/heavy-rightward-arrow/)
- [BLACK CENTRE STAR](https://aestheticsymbols.io/symbol/black-centre-star/)
- [SYM 268D](https://aestheticsymbols.io/symbol/sym-268d/)
- [ROBLOX NAMES](https://aestheticsymbols.io/roblox-names/)
- [SWIMMING FISH LEFT](https://aestheticsymbols.io/symbol/swimming-fish-left/)
- [SYM 1F628](https://aestheticsymbols.io/symbol/sym-1f628/)
- [SYM 26FE](https://aestheticsymbols.io/symbol/sym-26fe/)
- [KAOMOJI](https://aestheticsymbols.io/ru/kaomoji/)
- [WATER BUBBLES](https://aestheticsymbols.io/symbol/water-bubbles/)
- [SYM 1F631](https://aestheticsymbols.io/symbol/sym-1f631/)
- [SYM 26AB](https://aestheticsymbols.io/symbol/sym-26ab/)
- [SYM 2630](https://aestheticsymbols.io/symbol/sym-2630/)
- [TRENDING](https://aestheticsymbols.io/pt/trending/)
- [SYM 1F973](https://aestheticsymbols.io/symbol/sym-1f973/)
- [LEFT POINTING DOUBLE ANGLE QUOTATION](https://aestheticsymbols.io/symbol/left-pointing-double-angle-quotation/)
- [HEARTS](https://aestheticsymbols.io/es/hearts/)
- [SYM 1D41F](https://aestheticsymbols.io/symbol/sym-1d41f/)
- [SYM 1D42D](https://aestheticsymbols.io/symbol/sym-1d42d/)
- [SYM 1F928](https://aestheticsymbols.io/symbol/sym-1f928/)
- [SYM 1D414](https://aestheticsymbols.io/symbol/sym-1d414/)
- [MUSIC WEATHER](https://aestheticsymbols.io/es/music-weather/)
- [CHEERING FIGHTING FIST KAOMOJI](https://aestheticsymbols.io/symbol/cheering-fighting-fist-kaomoji/)
- [SYM 2749](https://aestheticsymbols.io/symbol/sym-2749/)
- [SYM 2689](https://aestheticsymbols.io/symbol/sym-2689/)
- [SYM 1D446](https://aestheticsymbols.io/symbol/sym-1d446/)
- [SYM 26F2](https://aestheticsymbols.io/symbol/sym-26f2/)
- [SYM 1D415](https://aestheticsymbols.io/symbol/sym-1d415/)
- [SYM 1D41A](https://aestheticsymbols.io/symbol/sym-1d41a/)
- [SYM 26AD](https://aestheticsymbols.io/symbol/sym-26ad/)
- [BLUSHING SOFT SMILE KAOMOJI](https://aestheticsymbols.io/symbol/blushing-soft-smile-kaomoji/)
- [TRENDING](https://aestheticsymbols.io/ja/trending/)
- [SYM 1D422](https://aestheticsymbols.io/symbol/sym-1d422/)
- [EIGHT POINTED BLACK STAR](https://aestheticsymbols.io/symbol/eight-pointed-black-star/)
- [SYM 1F617](https://aestheticsymbols.io/symbol/sym-1f617/)
- [BRACKETS](https://aestheticsymbols.io/es/brackets/)
- [HEARTS](https://aestheticsymbols.io/hearts/)
- [BIOHAZARD SYMBOL](https://aestheticsymbols.io/symbol/biohazard-symbol/)
- [SYM 2687](https://aestheticsymbols.io/symbol/sym-2687/)
- [TRENDING](https://aestheticsymbols.io/es/trending/)
- [HEARTS](https://aestheticsymbols.io/pt/hearts/)
- [SYM 2642](https://aestheticsymbols.io/symbol/sym-2642/)
- [SYM 2647](https://aestheticsymbols.io/symbol/sym-2647/)
- [SYM 273E](https://aestheticsymbols.io/symbol/sym-273e/)
- [HEAVY STAR](https://aestheticsymbols.io/symbol/heavy-star/)
- [SYM 1F636 200D 1F32B FE0F](https://aestheticsymbols.io/symbol/sym-1f636-200d-1f32b-fe0f/)
- [SYM 1F479](https://aestheticsymbols.io/symbol/sym-1f479/)
- [SYM 1FA77](https://aestheticsymbols.io/symbol/sym-1fa77/)
- [SYM 268C](https://aestheticsymbols.io/symbol/sym-268c/)
- [TIKTOK CAPTIONS](https://aestheticsymbols.io/pt/tiktok-captions/)
