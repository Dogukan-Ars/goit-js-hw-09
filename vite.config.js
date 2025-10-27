import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    define: {
      global: {},
    },
    base: isBuild ? '/goit-js-hw-09/' : '/',
    publicDir: 'public',
    root: 'src', // src içinde çalışacağız
    build: {
      sourcemap: true,
      outDir: '../dist', // src üstüne çıkıp kök dizine dist oluştur
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('src/*.html'), // src içindeki tüm HTML dosyalarını al
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    plugins: [
      injectHTML(),
      FullReload(['src/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
