import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import axios from 'axios';

async function mockTest() {
  const { data } = await axios('/api/get');
  console.log('mockTest', data);
}
mockTest();

// 测试env
console.log('import.meta.env', import.meta.env)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
