import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@features': path.resolve(__dirname, 'src', 'features'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@layouts': path.resolve(__dirname, 'src', 'layouts'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@types': path.resolve(__dirname, 'src', 'types'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
    },
  },
});
