module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['src/client/theme']
    }),
    require('postcss-mixins')({
      mixinsDir: ['src/client/theme/mixins']
    }),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true
      },
      browsers: 'last 2 versions'
    }),
    require('postcss-inline-svg')(),
    require('postcss-svgo')()
  ]
}