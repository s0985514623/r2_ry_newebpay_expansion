import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import alias from '@rollup/plugin-alias'
import path from 'path'
import optimizer from 'vite-plugin-optimizer'

// import liveReload from 'vite-plugin-live-reload'

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: 'testers',
    tserserOptions: {
      mangle: {
        reserved: ['$'],
      },
    },
    outDir: path.resolve(__dirname, 'js/dist'),

    // watch: {
    //   include: ['js/src/**', 'inc/**'],
    //   exclude: 'node_modules/**, .git/**, dist/**, .vscode/**',
    // },

    rollupOptions: {
      input: {
        admin: 'js/src/admin.ts',
        frontend: 'js/src/frontend.ts',
      },
      output: {
        assetFileNames: 'assets/[ext]/index.[ext]',
        entryFileNames: 'index-[name].js',
      },
    },
  },
  plugins: [
    alias(),
    tsconfigPaths(),

    // liveReload([
    //   __dirname + '/**/*.php',
    //   __dirname + '/js/dist/**/*',
    //   __dirname + '/js/src/**/*.tsx',
    // ]), // Optional, if you want to reload page on php changed

    optimizer({
      jquery: 'const $ = window.jQuery; export default $ ',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'js/src'),
    },
  },
})
