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
