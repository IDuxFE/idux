import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import path from 'path'
import { mdPlugin } from './scripts/vite/mdPlugin'

export default defineConfig({
  // hmr not work
  // root: './site/docs',
  plugins: [vuePlugin({ include: [/\.vue$/, /\.md$/] }), mdPlugin()],
  alias: [
    {
      find: '@idux',
      replacement: path.resolve(__dirname, 'packages'),
    },
    // [Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue.
    // Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".
    {
      find: 'vue',
      replacement: 'vue/dist/vue.esm-bundler.js',
    },
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
