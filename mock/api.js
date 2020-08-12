//没有定义失败

export default {
  //mothod url
  'get /user': function(req, res) {
    setTimeout(() => {
      res.json({
        id: 1,
        name: 'Frank',
      });
    }, 1500);
  },
  'get /books': function(req, res) {
    setTimeout(() => {
      res.json([
        {
          id: 1,
          name: 'JavaScript 高级程序设计',
        },
        {
          id: 2,
          name: 'JavaScript 精粹',
        },
      ]);
    }, 1500);
  },
  'get /movies': function(req, res) {
    setTimeout(() => {
      res.json([
        {
          id: 1,
          name: '爱在黎明破晓前',
        },
        {
          id: 2,
          name: '恋恋笔记本',
        },
      ]);
    }, 1500);
  },
};
