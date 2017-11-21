const webpack = require('webpack')
const {
  createConfig,
  match,

  // Feature blocks
  babel,
  css,
  devServer,
  file,
  postcss,
  uglify,

  // Shorthand setters
  addPlugins,
  setEnv,
  entryPoint,
  env,
  setOutput,
  sourceMaps
} = require('webpack-blocks')
const autoprefixer = require('autoprefixer')
const path = require('path')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  babel(),
  match('*.css', { exclude: path.resolve('node_modules') }, [
    css(),
    postcss([autoprefixer({ browsers: ['last 2 versions'] })])
  ]),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.webp'], [file()]),
  setEnv({
    NODE_ENV: process.env.NODE_ENV
  }),
  env('development', [
    devServer(),
    devServer.proxy({
      '/api': { target: 'http://localhost:3000' }
    }),
    sourceMaps()
  ]),
  env('production', [
    uglify(),
    addPlugins([new webpack.LoaderOptionsPlugin({ minimize: true })])
  ])
])
