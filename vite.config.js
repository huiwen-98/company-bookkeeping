import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/company-bookkeeping/', // 👈 这里改成你的仓库名
  plugins: [react()],
});
