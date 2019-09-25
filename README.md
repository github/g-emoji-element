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

The `tone` and `tones` attributes render the emoji with a [skin tone modifier][scale] between 1-5. Use
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

The `tones` attribute accepts a space separated list of skin tone modifiers to apply
to each base emoji in a sequence. Some platforms will display these sequences
as a single image while others will render each emoji in the sequence.

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
