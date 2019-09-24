describe('g-emoji', function() {
  describe('element creation', function() {
    afterEach(function() {
      document.body.innerHTML = ''
    })

    it('creates from document.createElement', function() {
      const el = document.createElement('g-emoji')
      assert.equal('G-EMOJI', el.nodeName)
    })

    it('creates from constructor', function() {
      const el = new window.GEmojiElement()
      assert.equal('G-EMOJI', el.nodeName)
    })
  })

  describe('in emoji-supporting platforms', function() {
    beforeEach(function() {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'macOS',
        configurable: true
      })
      document.body.innerHTML = '<g-emoji>🦖</g-emoji>'
    })

    afterEach(function() {
      document.body.innerHTML = ''
    })

    it('nothing changes', function() {
      const GEmoji = document.querySelector('g-emoji')
      assert.equal(GEmoji.innerHTML, '🦖')
    })

    describe('skin tone modifiers', function() {
      it('ignores modifiers for emoji that do not support it', function() {
        const emoji = document.createElement('g-emoji')
        emoji.textContent = '🦖'
        emoji.tone = 1
        assert.equal(emoji.textContent, '🦖')
      })

      it('applies skin tone modifier', function() {
        const emoji = document.createElement('g-emoji')
        emoji.textContent = '👋'

        emoji.tone = 1
        assert.equal(emoji.textContent, '👋🏻')

        emoji.tone = 2
        assert.equal(emoji.textContent, '👋🏼')

        emoji.tone = 3
        assert.equal(emoji.textContent, '👋🏽')

        emoji.tone = 4
        assert.equal(emoji.textContent, '👋🏾')

        emoji.tone = 5
        assert.equal(emoji.textContent, '👋🏿')
      })

      it('removes skin tone modifier', function() {
        const emoji = document.createElement('g-emoji')
        emoji.textContent = '👋🏽'
        emoji.tone = 0
        assert.equal(emoji.textContent, '👋')
      })

      it('applies tone attribute', function() {
        const emoji = document.createElement('g-emoji')
        emoji.textContent = '👋'
        emoji.setAttribute('tone', '3')
        assert.equal(emoji.textContent, '👋🏽')
      })
    })

    describe('editing skin tone modifiers', function() {
      describe('applying a single tone', function() {
        it('appends modifier', function() {
          // 👋 waving hand
          const original = '\u{1f44b}'
          // 👋🏿 waving hand, tone
          const expected = '\u{1f44b}\u{1f3ff}'
          assertCodepoints(original, expected, 5)
        })

        it('replaces modifier', function() {
          // 👋🏻 waving hand, tone
          const original = '\u{1f44b}\u{1f3fb}'
          // 👋🏿 waving hand, tone
          const expected = '\u{1f44b}\u{1f3ff}'
          assertCodepoints(original, expected, 5)
        })

        it('replaces presentation code with modifier', function() {
          // 🕵️‍♀️ sleuth, variation 16, zwj, gender, variation 16
          const original = '\u{1f575}\u{fe0f}\u{200d}\u{2640}\u{fe0f}'
          // 🕵🏿‍♀️ sleuth, tone, zwj, gender, variation 16
          const expected = '\u{1f575}\u{1f3ff}\u{200d}\u{2640}\u{fe0f}'
          assertCodepoints(original, expected, 5)
        })

        it('inserts modifier before gender', function() {
          // 🏃‍♂️ runner, zwj, gender, variation 16
          const original = '\u{1f3c3}\u{200d}\u{2642}\u{fe0f}'
          // 🏃🏿‍♂️ runner, tone, zwj, gender, variation 16
          const expected = '\u{1f3c3}\u{1f3ff}\u{200d}\u{2642}\u{fe0f}'
          assertCodepoints(original, expected, 5)
        })

        it('inserts modifier after each emoji in a sequence', function() {
          // 🧑‍🤝‍🧑 person, zwj, handshake, zwj, person
          const original = '\u{1f9d1}\u{200d}\u{1f91d}\u{200d}\u{1f9d1}'
          // 🧑🏿‍🤝‍🧑🏿 person, tone, zwj, handshake, zwj, person, tone
          const expected = '\u{1f9d1}\u{1f3ff}\u{200d}\u{1f91d}\u{200d}\u{1f9d1}\u{1f3ff}'
          assertCodepoints(original, expected, 5)
        })

        it('replaces modifier after each emoji in a sequence', function() {
          // 🧑🏾‍🤝‍🧑🏻 person, tone, zwj, handshake, zwj, person, tone
          const original = '\u{1f9d1}\u{1f3fe}\u{200d}\u{1f91d}\u{200d}\u{1f9d1}\u{1f3fb}'
          // 🧑🏿‍🤝‍🧑🏿 person, tone, zwj, handshake, zwj, person, tone
          const expected = '\u{1f9d1}\u{1f3ff}\u{200d}\u{1f91d}\u{200d}\u{1f9d1}\u{1f3ff}'
          assertCodepoints(original, expected, 5)
        })
      })
    })

    function assertCodepoints(original, expected, tone) {
      const el = document.createElement('g-emoji')
      el.textContent = original
      el.tone = tone
      const replaced = el.textContent
      assert.deepEqual(codepoints(replaced), codepoints(expected))
    }

    function codepoints(text) {
      return [...text].map(point => point.codePointAt(0).toString(16))
    }
  })

  describe('in non emoji-supporting platforms', function() {
    beforeEach(function() {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Linux',
        configurable: true
      })
      document.body.innerHTML = '<g-emoji>🦖</g-emoji>'
    })

    afterEach(function() {
      document.body.innerHTML = ''
    })

    it('we provide a image tag', function() {
      const GEmoji = document.querySelector('g-emoji')
      assert.equal(GEmoji.innerHTML, '<img class="emoji" alt="" height="20" width="20" src="">')
    })
  })
})
