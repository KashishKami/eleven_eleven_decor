import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/admin-editor/index.tsx'),
      name: 'AdminEditorBundle',
      formats: ['iife'],
      fileName: () => 'editor.bundle.js',
    },
    outDir: path.resolve(__dirname, 'php-admin/manage-7f3b9x2k'),
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'editor.bundle.css'
          }
          return '[name].[ext]'
        },
      },
    },
  },
})
