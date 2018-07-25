/* @flow */

import babel from 'rollup-plugin-babel'

const pkg = require('./package.json')

export default {
  input: 'index.js',
  output: [
    {
      file: pkg['module'],
      format: 'es'
    },
    {
      file: pkg['main'],
      format: 'umd',
      name: 'g-emoji'
    }
  ],
  plugins: [
    babel({
      plugins: ['transform-custom-element-classes'],
      presets: ['es2015-rollup', 'flow']
    })
  ]
}
