// vite.config.js
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  build: {
    root: 'src',
    outDir: 'dist', // Каталог для сборки
    emptyOutDir: true,
    assetsDir: 'assets', // Каталог для статических ресурсов
    rollupOptions: {
      input: 'index.html', // Ваш главный HTML-файл
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
});