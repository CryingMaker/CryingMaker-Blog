import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import postcss from 'postcss';
import autoprefixer from 'autoprefixer'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "env",
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue',],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [NaiveUiResolver()]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/init.scss";',
      }
    },
    postcss: {
      plugins: [
        postcss(),
        autoprefixer()
      ]
    }
  },
})
