import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MzUI',
      fileName: (format) => `mz-ui.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', '@element-plus/icons-vue', 'axios', 'vue-router', 'pinia'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          'axios': 'axios',
          'vue-router': 'VueRouter',
          'pinia': 'Pinia'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@http': resolve(__dirname, 'src/components/utils/http-simple.js'),
      '@utils': resolve(__dirname, 'src/components/utils/index.js'),
      '@mz-filter-view': resolve(__dirname, 'src/components/filter-view/index.vue'),
      '@mz-table-view': resolve(__dirname, 'src/components/table-view/index.vue'),
      '@mz-form-view': resolve(__dirname, 'src/components/form-view/index.vue'),
      '@mz-detail-view': resolve(__dirname, 'src/components/detail-view/index.vue'),
      '@mz-form-control': resolve(__dirname, 'src/components/form-control/index.vue'),
      '@icons-element': resolve(__dirname, 'src/icons/index.js'),
      '@store': resolve(__dirname, 'src/store')
    }
  }
})
