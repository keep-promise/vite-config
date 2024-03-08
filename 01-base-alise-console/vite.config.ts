import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 默认 / 开头
  // 开发或生产环境服务的公共基础路径
  // 存在隐患：linux开发服务可能访问不到资源 src="/src/assets/react.svg"
  base: './',
  plugins: [react()],
  resolve: {
    // 配置路径别名
    alias: {
      "@asset": resolve(__dirname, './src/assets')
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境去掉console.*、debugger
        drop_console: true,
        drop_debugger: true
      }
    }

  }
})
