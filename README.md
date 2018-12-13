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
  <img class="emoji" alt="🦖" title="T-Rex" height="20" width="20" src="t-rex.png">
</g-emoji>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Internet Explorer 11
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
