import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  root: './site/docs/',
  plugins: [vuePlugin()],
  alias: [
    {
      find: '@idux',
      replacement: path.resolve(__dirname, 'packages'),
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
