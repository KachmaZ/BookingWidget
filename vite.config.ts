import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'BookingWidget',
      fileName: 'booking-widget',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      external: [],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/style/index.scss" as *;',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), // Добавляем замену для process.env.NODE_ENV
  },
});
