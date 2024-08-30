import path from 'path';
import { defineConfig } from 'vite';
import styleX from 'vite-plugin-stylex';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), styleX(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network.
    host: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://broker-api.com:30002/v1',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
});
