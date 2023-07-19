import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'

const pxToVw = postcssPxToViewport({
  unitToConvert: 'px',
  viewportWidth: 375,
  unitPrecision: 5,
  propList: ['*'],
  viewportUnit: 'vw',
  fontViewportUnit: 'wv',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: true,
  exclude: /node_modules/,
})

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  css: {
    postcss: {
      plugins: [pxToVw],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
