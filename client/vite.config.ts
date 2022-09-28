import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@layouts': path.resolve(__dirname, 'src', 'layouts'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@features': path.resolve(__dirname, 'src', 'features'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
    },
  },
  plugins: [react()],
});
