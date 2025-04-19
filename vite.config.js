import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg'
    })
  ],
  optimizeDeps: {
    include: ['@mui/material/Tooltip']
  },
  // base: './'
  resolve: {
    alias: [
      { find: '~', replacement: '/src' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@redux', replacement: '/src/redux' }
    ]
  }
})
