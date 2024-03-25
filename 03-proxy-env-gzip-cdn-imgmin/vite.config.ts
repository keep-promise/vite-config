import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin'; // 图片压缩
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 默认 / 开头
  // 开发或生产环境服务的公共基础路径
  // 存在隐患：linux开发服务可能访问不到资源 src="/src/assets/react.svg"
  base: './',
  plugins: [
    react(),
    viteCompression(), // gzip压缩
    viteMockServe({
      mockPath: 'mock',
      enable: true
    }),
    // cdn引入
    // importToCDN({
    //   modules: [
    //     {
    //       name: 'react',
    //       var: 'React',
    //       path: `https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js`,
    //     },
    //     {
    //       name: 'react-dom',
    //       var: 'ReactDOM',
    //       path: `https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js`,
    //     },
    //   ],
    // })
  ],
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
  },
  // 解决开发跨域问题
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
      // 使用 proxy 实例
      '/app': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true,
      },
    },
  },
})


