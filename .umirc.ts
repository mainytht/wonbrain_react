import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login' },
    { exact: true, path: '/', redirect: '/first' },
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        { path: '/list', component: '@/pages/list/content.js' },
        { path: '/admin', component: '@/pages/admin' },
        { path: '/cyto', component: '@/pages/cyto' },
        { path: '/visjs', component: '@/pages/visjs' },
        { path: '/first', component: '@/pages/first' },
        { path: '/markdown', component: '@/pages/markdown' },
        { path: '/dragmd5', component: '@/pages/dragmd5' },
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
  request: {
    dataField: '',
    // 启用方式默认启用。
    // dataField 对应接口统一格式中的数据字段，比如接口如果统一的规范是 { success: boolean, data: any} ，那么就不需要配置，这样你通过 useRequest 消费的时候会生成一个默认的 formatResult，直接返回 data 中的数据，方便使用。如果你的后端接口不符合这个规范，可以自行配置 dataField 。配置为 '' （空字符串）的时候不做处理。
  },
});
