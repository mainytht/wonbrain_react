export default {
  // 支持值为 Object 和 Array
  'GET /testapi/users': { users: [1, 2] },
  // GET 可忽略
  '/testapi/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /testapi/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
  'GET /user': { id: 2, name: '小李飞刀' },
  'GET /books': [
    { id: 1, name: '演员的自我修养' },
    { id: 2, name: '我的奋斗' },
  ],
  'GET /movies': [
    { id: 1, name: '阿甘正传' },
    { id: 2, name: '红辣椒' },
  ],
};
